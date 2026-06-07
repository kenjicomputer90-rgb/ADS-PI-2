import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const adapter = new PrismaBetterSqlite3({ url: "file:./banco/dev.db" })
const prisma = new PrismaClient({ adapter })

function toISODate(date?: string | Date): string {
  if (!date) return new Date().toISOString();
  if (date instanceof Date) return date.toISOString();
  return new Date(date.split('T')[0] + 'T12:00:00.000Z').toISOString();
}

const STATUS_DISPONIVEL  = 1
const STATUS_ALUGADO     = 2
const STATUS_RESERVADO   = 5
const STATUS_PREPARACAO  = 6

export async function buscarStatusAtualPeca(idPeca: number) {
  return await prisma.historico_peca.findFirst({
    where: { id_peca: idPeca, data_fim: null },
    orderBy: { data_inicio: "desc" },
    include: { status_peca: true }
  })
}

export async function alterarStatusPeca(idPeca: number, novoStatus: number) {
  const peca = await prisma.peca_produto.findUnique({ where: { id_peca: idPeca } })
  if (!peca) throw new Error("Peça não encontrada")

  await prisma.historico_peca.updateMany({
    where: { id_peca: idPeca, data_fim: null },
    data: { data_fim: toISODate() }  // ← corrigido: string ISO em vez de new Date()
  })

  return await prisma.historico_peca.create({
    data: { id_peca: idPeca, id_status: novoStatus, data_inicio: toISODate() }
  })
}

export async function criarLocacao(data: {
  id_cliente: number; id_usuario: number; id_funcionario: number;
  id_peca: number; data_evento: string;
  preco_aluguel: number;
}) {
  const cliente = await prisma.cliente.findUnique({ where: { id_cliente: data.id_cliente } })
  if (!cliente) throw new Error("Cliente não encontrado")

  const usuario = await prisma.usuario.findUnique({ where: { id_usuario: data.id_usuario } })
  if (!usuario) throw new Error("Usuário não encontrado")

  const funcionario = await prisma.funcionario.findUnique({ where: { id_funcionario: data.id_funcionario } })
  if (!funcionario) throw new Error("Funcionário não encontrado")

  const peca = await prisma.peca_produto.findUnique({ where: { id_peca: data.id_peca } })
  if (!peca) throw new Error("Peça não encontrada")

  const statusAtual = await buscarStatusAtualPeca(data.id_peca)
  if (!statusAtual) throw new Error("Peça não possui status cadastrado")
  if (statusAtual.id_status !== STATUS_DISPONIVEL) throw new Error("Peça não está disponível para locação")

  const locacao = await (prisma.locacao as any).create({
    data: {
      id_cliente: data.id_cliente,
      id_usuario: data.id_usuario,
      id_funcionario: data.id_funcionario,
      data_evento: toISODate(data.data_evento),
      status: "RESERVADA",
      item_locacao: {
        create: { id_peca: data.id_peca }
      }
    },
    include: { item_locacao: true, cliente: true, funcionario: true }
  })

  await alterarStatusPeca(data.id_peca, STATUS_RESERVADO)
  return locacao
}

export async function cancelarLocacao(idLocacao: number) {
  const locacao = await prisma.locacao.findUnique({
    where: { id_locacao: idLocacao },
    include: { item_locacao: true }
  })
  if (!locacao) throw new Error("Locação não encontrada")
  if (locacao.status === "CANCELADA") throw new Error("Locação já está cancelada")
  if (locacao.status === "DEVOLVIDA") throw new Error("Locação devolvida não pode ser cancelada")

  for (const item of locacao.item_locacao) {
    await alterarStatusPeca(item.id_peca, STATUS_DISPONIVEL)
  }

  return await (prisma.locacao as any).update({
    where: { id_locacao: idLocacao },
    data: { status: "CANCELADA" },
    include: { item_locacao: true }
  })
}

export async function entregarLocacao(idLocacao: number) {
  const locacao = await prisma.locacao.findUnique({
    where: { id_locacao: idLocacao },
    include: { item_locacao: true }
  })
  if (!locacao) throw new Error("Locação não encontrada")
  if (locacao.status !== "RESERVADA") throw new Error("Só é possível entregar uma locação reservada")

  for (const item of locacao.item_locacao) {
    await alterarStatusPeca(item.id_peca, STATUS_ALUGADO)
  }

  return await (prisma.locacao as any).update({
    where: { id_locacao: idLocacao },
    data: { status: "ENTREGUE" },
    include: { item_locacao: true }
  })
}

export async function devolverLocacao(idLocacao: number) {
  const locacao = await prisma.locacao.findUnique({
    where: { id_locacao: idLocacao },
    include: { item_locacao: true }
  })
  if (!locacao) throw new Error("Locação não encontrada")
  if (locacao.status !== "ENTREGUE") throw new Error("Só é possível devolver uma locação entregue")

  for (const item of locacao.item_locacao) {
    await alterarStatusPeca(item.id_peca, STATUS_PREPARACAO)
  }

  return await (prisma.locacao as any).update({
    where: { id_locacao: idLocacao },
    data: {
      status: "DEVOLVIDA",
      data_devolucao: toISODate()
    },
    include: { item_locacao: true }
  })
}

export async function trocarPeca(idLocacao: number, novaPecaId: number) {
  const locacao = await prisma.locacao.findUnique({
    where: { id_locacao: idLocacao },
    include: { item_locacao: true }
  })
  if (!locacao) throw new Error("Locação não encontrada")
  if (locacao.status !== "RESERVADA") throw new Error("Só é possível trocar peça de uma locação reservada")
  if (locacao.item_locacao.length === 0) throw new Error("Locação não possui peça vinculada")

  const statusNovaPeca = await buscarStatusAtualPeca(novaPecaId)
  if (!statusNovaPeca) throw new Error("Nova peça não possui status cadastrado")
  if (statusNovaPeca.id_status !== STATUS_DISPONIVEL) throw new Error("Nova peça não está disponível")

  const itemAntigo = locacao.item_locacao[0]!
  await alterarStatusPeca(itemAntigo.id_peca, STATUS_DISPONIVEL)
  await alterarStatusPeca(novaPecaId, STATUS_RESERVADO)

  return await prisma.item_locacao.update({
    where: { id_item: itemAntigo.id_item },
    data: { id_peca: novaPecaId }
  })
}