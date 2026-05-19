import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
 url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('Semeando status padrões...');

  // Criando os status usando upsert (evita duplicar se rodar mais de uma vez)
  const statusDisponivel = await prisma.status_peca.upsert({
    where: { id_status: 1 },
    update: {},
    create: {
      id_status: 1,
      descricao: 'Disponível',
    },
  });

  const statusAlugado = await prisma.status_peca.upsert({
    where: { id_status: 2 },
    update: {},
    create: {
      id_status: 2,
      descricao: 'Alugado',
    },
  });

  const statusManutencao = await prisma.status_peca.upsert({
    where: { id_status: 3 },
    update: {},
    create: {
      id_status: 3,
      descricao: 'Em Manutenção',
    },
  });

  console.log({ statusDisponivel, statusAlugado, statusManutencao });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    //process.exit(1);
  });
