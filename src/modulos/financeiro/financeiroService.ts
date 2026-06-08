import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./banco/dev.db" });
const prisma = new PrismaClient({ adapter });

const MULTA_POR_DIA = 50; // R$ 50 por dia de atraso — ajuste conforme a regra de negócio

export async function obterFaturamentoTotal() {
  // Busca todos os pagamentos registrados (tabela pagamento existe no SQL)
  const pagamentos = await prisma.pagamento.findMany({
    include: { locacao: true }
  });

  const faturamentoBaseLocacoes = pagamentos.reduce((soma, p) => soma + Number(p.valor), 0);

  // Calcula multas: locações DEVOLVIDAS com data_devolucao > data_evento
  const locacoesDevolvidas = await (prisma.locacao as any).findMany({
    where: { status: "DEVOLVIDA" }
  });

  let faturamentoPorMultas = 0;
  for (const loc of locacoesDevolvidas) {
    if (loc.data_devolucao && loc.data_evento) {
      const evento = new Date(loc.data_evento);
      const devolucao = new Date(loc.data_devolucao);
      const diasAtraso = Math.max(0, Math.floor((devolucao.getTime() - evento.getTime()) / (1000 * 60 * 60 * 24)));
      faturamentoPorMultas += diasAtraso * MULTA_POR_DIA;
    }
  }

  // Conta locações realizadas (exceto canceladas)
  const quantidadeLocacoes = await (prisma.locacao as any).count({
    where: { status: { not: "CANCELADA" } }
  });

  return {
    quantidadeLocacoes,
    faturamentoBaseLocacoes,
    faturamentoPorMultas,
    faturamentoBrutoTotal: faturamentoBaseLocacoes + faturamentoPorMultas
  };
}

export async function addPagamento(id_locacao: number, valor: number) {
  return await prisma.pagamento.create({
    data: { id_locacao, valor }
  });
}

export async function obterCustosSalariais() {
  const funcionarios = await prisma.funcionario.findMany();
  const totalSalarios = funcionarios.reduce((soma, func) => soma + Number(func.salario || 0), 0);
  return {
    totalFuncionarios: funcionarios.length,
    custoSalarialTotal: totalSalarios
  };
}

export async function addManutencao(id_peca: number, descricao: string, data_manutencao: Date) {
  return await prisma.manutencao.create({
    data: { id_peca, descricao, data_manutencao }
  });
}

export async function removeManutencao(id: number) {
  return await prisma.manutencao.delete({ where: { id_manutencao: id } });
}

export async function changeManutencao(id: number, descricao: string) {
  return await prisma.manutencao.update({
    where: { id_manutencao: id },
    data: { descricao }
  });
}