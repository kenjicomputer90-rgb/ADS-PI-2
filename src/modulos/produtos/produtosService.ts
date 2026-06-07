import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./banco/dev.db" });
const prisma = new PrismaClient({ adapter });

// Helper ISO date — mesmo padrão de cliente/funcionario
function toISODate(date?: string | Date): string {
  if (!date) return new Date().toISOString();
  if (date instanceof Date) return date.toISOString();
  return new Date(date.split('T')[0] + 'T12:00:00.000Z').toISOString();
}

// Helper: busca status atual (data_fim null) de uma peça
async function statusAtual(id_peca: number) {
  return await prisma.historico_peca.findFirst({
    where: { id_peca, data_fim: null },
    orderBy: { data_inicio: "desc" }
  });
}

// Helper: encerra status atual e cria novo
async function mudarStatus(id_peca: number, id_status: number) {
  await prisma.historico_peca.updateMany({
    where: { id_peca, data_fim: null },
    data: { data_fim: toISODate() }
  });
  return await prisma.historico_peca.create({
    data: { id_peca, id_status, data_inicio: toISODate() }
  });
}

export async function addProduto(
  nome: string, material: string, descricao: string,
  preco: number, status: 1 | 2 | 3 | 4, tamanho: number, cor: string
) {
  return await prisma.peca_produto.create({
    data: {
      codigo_unico: nome,
      descricao,
      tamanho: String(tamanho),
      cor,
      material,
      preco,
      historico_peca: {
        create: { id_status: status, data_inicio: toISODate() }
      }
    },
    include: { historico_peca: true }
  });
}

export async function removeProduto(id: number) {
  return await prisma.peca_produto.delete({ where: { id_peca: id } });
}

export async function listProduto() {
  return await prisma.peca_produto.findMany({
    include: {
      historico_peca: {
        where: { data_fim: null },  // só o status atual
        include: { status_peca: true }
      }
    }
  });
}

export async function precificaProduto(id: number) {
  const produto = await prisma.peca_produto.findUnique({ where: { id_peca: id } });
  if (!produto) throw new Error("Produto não encontrado");
  return { id: produto.id_peca, preco: produto.preco };
}

export async function returnProduto(id: number) {
  const produto = await prisma.peca_produto.findUnique({
    where: { id_peca: id },
    include: {
      historico_peca: {
        where: { data_fim: null },
        include: { status_peca: true }
      }
    }
  });
  if (!produto) throw new Error("Produto não encontrado");
  return produto;
}

export async function changeProduto(id: number, data: {
  nome?: string; material?: string; descricao?: string;
  preco?: number; status?: string; tamanho?: number; cor?: string;
}) {
  const filteredData = Object.fromEntries(
    Object.entries({
      codigo_unico: data.nome, material: data.material, descricao: data.descricao,
      preco: data.preco, tamanho: data.tamanho ? String(data.tamanho) : undefined, cor: data.cor
    }).filter(([_, v]) => v !== undefined)
  );
  return await prisma.peca_produto.update({
    where: { id_peca: id },
    data: filteredData,
    include: { historico_peca: { where: { data_fim: null } } }
  });
}

export async function updateProdutoStatus(idProduto: number, status: 1 | 2 | 3 | 4) {
  return await mudarStatus(idProduto, status);
}

export async function alterarStatus(idPeca: number, idStatus: number) {
  return await mudarStatus(idPeca, idStatus);
}

export async function reservar(id: number) { return await mudarStatus(id, 5); }
export async function saida(id: number)    { return await mudarStatus(id, 4); } // 4=vendido, consistente com logistica
export async function devolucao(id: number){ return await mudarStatus(id, 1); }
export async function venda(id: number)    { return await mudarStatus(id, 4); }
export async function troca(id: number, data: any) { return await changeProduto(id, data); }

export async function produtosPorStatus(status: number) {
  return await prisma.peca_produto.findMany({
    where: { historico_peca: { some: { id_status: status, data_fim: null } } },
    include: { historico_peca: { where: { data_fim: null } } }
  });
}

export async function porcentagem_venda(tipo: string, tipo_buscado: string, status: number) {
  const total = await prisma.peca_produto.count({
    where: { historico_peca: { some: { id_status: status, data_fim: null } } }
  });
  const vendidos = await prisma.peca_produto.count({
    where: { [tipo]: tipo_buscado, historico_peca: { some: { id_status: status, data_fim: null } } }
  });
  return { porcentagem: total === 0 ? 0 : (vendidos / total) * 100 };
}

export async function produtosOciosos() {
  const noventaDiasAtras = new Date();
  noventaDiasAtras.setDate(noventaDiasAtras.getDate() - 90);
  return await prisma.peca_produto.findMany({
    where: { historico_peca: { some: { data_inicio: { lt: noventaDiasAtras } } } }
  });
}

export async function produtosManutencao(descricao: string, id_peca:number) {
 await mudarStatus(id_peca, 3);

return await prisma.peca_produto.update({
  where: {
    id_peca
  },
  data: {
    manutencao: {
      create: {
        descricao,
        data_manutencao: new Date()
      }
    }
  },
  include: {
    manutencao: true
  }
});
}

export async function returnProdutoStatus(id: number) {
  const produto = await prisma.peca_produto.findUnique({
  where: {
    id_peca: id
  },
  include: {
  historico_peca: {
    include: {
      status_peca: true
    },
    orderBy: {
      data_inicio: 'desc'
    },
    take: 1
  }
}
})

  if (!produto) {
    throw new Error("Produto não encontrado")
  }

  return produto.historico_peca[0]?.status_peca.descricao


}