import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FinanceiroService {
  // Calcula o faturamento extra obtido através de taxas de manutenção/reparos
  async calculaFaturamentoManutencao() {
    // Busca todas as manutenções registradas no banco SQLite
    // (Nota: Se o nome exato da tabela no seu schema for diferente, o TypeScript vai te avisar aqui)
    const manutencoes = await prisma.manutencao.findMany();

    // Regra de Negócio: Calcula o valor total cobrado pelos reparos das roupas devolvidas com defeito
    // Substitua 'valor' pelo nome real da coluna de preço/custo da taxa na sua tabela
    const totalArrecadado = manutencoes.reduce((total, item) => total + Number(item.valor || 0), 0);

    return {
      quantidadeReparos: manutencoes.length,
      faturamentoManutencaoTotal: totalArrecadado
    };
  }
}
