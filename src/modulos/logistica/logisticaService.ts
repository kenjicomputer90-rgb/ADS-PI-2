import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db",
})

const prisma = new PrismaClient({
  adapter,
})

const STATUS_DISPONIVEL = 1
const STATUS_ALUGADO = 2
const STATUS_MANUTENCAO = 3
const STATUS_VENDIDO = 4
const STATUS_RESERVADO = 5
const STATUS_PREPARACAO = 6

export async function buscarStatusAtualPeca(idPeca: number) {
  return await prisma.historico_peca.findFirst({
    where: {
      id_peca: idPeca,
      data_fim: null,
    },
    orderBy: {
      data_inicio: "desc",
    },
    include: {
      status_peca: true,
      peca_produto: true,
    },
  })
}

export async function alterarStatusPeca(idPeca: number, novoStatus: number) {
  const peca = await prisma.peca_produto.findUnique({
    where: {
      id_peca: idPeca,
    },
  })

  if (!peca) {
    throw new Error("Peça não encontrada")
  }

  await prisma.historico_peca.updateMany({
    where: {
      id_peca: idPeca,
      data_fim: null,
    },
    data: {
      data_fim: new Date(),
    },
  })

  return await prisma.historico_peca.create({
    data: {
      id_peca: idPeca,
      id_status: novoStatus,
      data_inicio: new Date(),
    },
    include: {
      status_peca: true,
      peca_produto: true,
    },
  })
}

export async function listarEstoque() {
  return await prisma.peca_produto.findMany({
    include: {
      historico_peca: {
        where: {
          data_fim: null,
        },
        include: {
          status_peca: true,
        },
      },
    },
  })
}

export async function listarPecasEmPreparacao() {
  return await prisma.peca_produto.findMany({
    where: {
      historico_peca: {
        some: {
          id_status: STATUS_PREPARACAO,
          data_fim: null,
        },
      },
    },
    include: {
      historico_peca: {
        where: {
          data_fim: null,
        },
        include: {
          status_peca: true,
        },
      },
    },
  })
}

export async function separarPeca(idPeca: number) {
  const statusAtual = await buscarStatusAtualPeca(idPeca)

  if (!statusAtual) {
    throw new Error("Peça não possui status cadastrado")
  }

  if (
    statusAtual.id_status !== STATUS_DISPONIVEL &&
    statusAtual.id_status !== STATUS_RESERVADO
  ) {
    throw new Error("Peça não pode ser separada no status atual")
  }

  return await alterarStatusPeca(idPeca, STATUS_PREPARACAO)
}

export async function conferirSaida(idPeca: number) {
  const statusAtual = await buscarStatusAtualPeca(idPeca)

  if (!statusAtual) {
    throw new Error("Peça não possui status cadastrado")
  }

  if (
    statusAtual.id_status !== STATUS_RESERVADO &&
    statusAtual.id_status !== STATUS_PREPARACAO
  ) {
    throw new Error("Peça não está pronta para conferência de saída")
  }

  return await alterarStatusPeca(idPeca, STATUS_ALUGADO)
}

export async function conferirDevolucao(idPeca: number, possuiAvaria: boolean) {
  const statusAtual = await buscarStatusAtualPeca(idPeca)

  if (!statusAtual) {
    throw new Error("Peça não possui status cadastrado")
  }

  if (
    statusAtual.id_status !== STATUS_ALUGADO &&
    statusAtual.id_status !== STATUS_PREPARACAO
  ) {
    throw new Error("Peça não está em status válido para devolução")
  }

  if (possuiAvaria) {
    return await alterarStatusPeca(idPeca, STATUS_MANUTENCAO)
  }

  return await alterarStatusPeca(idPeca, STATUS_DISPONIVEL)
}