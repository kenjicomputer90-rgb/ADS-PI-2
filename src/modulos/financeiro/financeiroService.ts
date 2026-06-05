import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./banco/dev.db" });
const prisma = new PrismaClient({ adapter });

//  RECEITAS: ENTRADAS DE LOCAÇÕES E MULTAS 
export async function obterFaturamentoTotal() {
 
  const locacoes = await prisma.locacao.findMany();
 
  // Soma os valores base das locações
  const totalLocacoes = locacoes.reduce((soma, loc) => soma + Number(loc.preco_total || 0), 0);
 
  // Soma as multas aplicadas por atraso 
  const totalMultas = locacoes.reduce((soma, loc) => soma + Number(loc.multa || 0), 0);
 
  return {
    quantidadeLocacoes: locacoes.length,
    faturamentoBaseLocacoes: totalLocacoes,
    faturamentoPorMultas: totalMultas,
    faturamentoBrutoTotal: totalLocacoes + totalMultas
  };
}

export async function addFinanceiro(id_locacao: number, valor: number) {
  const newPagamento = await prisma.pagamento.create({
    data: {
      id_locacao: id_locacao,
      valor: valor
    }
  });
  return newPagamento;
 }

//  2. SAÍDAS: CUSTOS SALARIAIS
export async function obterCustosSalariais() {
  const funcionarios = await prisma.funcionario.findMany();
  const totalSalarios = funcionarios.reduce((soma, func) => soma + Number(func.salario || 0), 0);
 
  return {
    totalFuncionarios: funcionarios.length,
    custoSalarialTotal: totalSalarios
  };
}

//  3. LOGÍSTICA: MANUTENÇÕES  
export async function addManutencao(id_peca: number, descricao: string, data_manutencao: Date) {
  return await prisma.manutencao.create({
    data: { id_peca, descricao, data_manutencao }
  });
}

export async function removeManutencao(id: number) {
  return await prisma.manutencao.delete({
    where: { id_manutencao: id }
  });
}

export async function changeManutencao(id: number, descricao: string) {
  return await prisma.manutencao.update({
    where: { id_manutencao: id },
    data: { descricao }
  });
}