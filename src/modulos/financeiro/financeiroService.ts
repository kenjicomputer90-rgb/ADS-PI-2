import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({ adapter });

export class FinanceiroService {
  async calculaFaturamentoManutencao() {
    const manutencoes = await prisma.manutencao.findMany();
    const totalArrecadado = manutencoes.reduce((total, item) => total + Number(item.valor || 0), 0);

    return {
      quantidadeReparos: manutencoes.length,
      faturamentoManutencaoTotal: totalArrecadado
    };
  }
}
