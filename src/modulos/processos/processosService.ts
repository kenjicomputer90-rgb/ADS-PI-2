import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db",
})

const prisma = new PrismaClient({
  adapter,
})

export async function listarKanban() {
  const reservadas = await prisma.locacao.findMany({
    where: {
      status: "RESERVADA",
    },
    include: {
      cliente: true,
      funcionario: true,
      item_locacao: {
        include: {
          peca_produto: true,
        },
      },
    },
  })

  const entregues = await prisma.locacao.findMany({
    where: {
      status: "ENTREGUE",
    },
    include: {
      cliente: true,
      funcionario: true,
      item_locacao: {
        include: {
          peca_produto: true,
        },
      },
    },
  })

  const devolvidas = await prisma.locacao.findMany({
    where: {
      status: "DEVOLVIDA",
    },
    include: {
      cliente: true,
      funcionario: true,
      item_locacao: {
        include: {
          peca_produto: true,
        },
      },
    },
  })

  const canceladas = await prisma.locacao.findMany({
    where: {
      status: "CANCELADA",
    },
    include: {
      cliente: true,
      funcionario: true,
      item_locacao: {
        include: {
          peca_produto: true,
        },
      },
    },
  })

  return {
    reservadas,
    entregues,
    devolvidas,
    canceladas,
  }
}

export async function listarAtrasos() {
  const hoje = new Date()

  return await prisma.locacao.findMany({
    where: {
      data_evento: {
        lt: hoje,
      },
      status: {
        notIn: ["DEVOLVIDA", "CANCELADA"],
      },
    },
    include: {
      cliente: true,
      funcionario: true,
      item_locacao: {
        include: {
          peca_produto: true,
        },
      },
    },
  })
}

export async function listarDevolucoesPendentes() {
  return await prisma.locacao.findMany({
    where: {
      status: "ENTREGUE",
    },
    include: {
      cliente: true,
      funcionario: true,
      item_locacao: {
        include: {
          peca_produto: true,
        },
      },
    },
  })
}

export async function enviarAlertaAtraso() {
  const atrasos = await listarAtrasos()

  return {
    mensagem: "Alertas de atraso gerados com sucesso",
    total: atrasos.length,
    locacoes: atrasos,
  }
}