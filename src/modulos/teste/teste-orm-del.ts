import { PrismaClient } from '@prisma/client';

// Iniciamos o motor do Prisma ORM
const prisma = new PrismaClient();

async function main() {
  console.log("-> Conectando ao MySQL e tentando remover o registro de teste...");

  // Força a ORM a deletar o usuário cujo email é o do teste
  const usuarioDeletado = await prisma.usuario.delete({
    where: {
      email: "laerte.reis@teste.com"
    }
  });

  console.log("-> REGISTRO REMOVIDO COM SUCESSO! Dados removidos:", usuarioDeletado.nome);
}

main()
  .catch((erro) => {
    console.error("❌ ERRO DA ORM:", erro.message);
  })
  .finally(async () => {
    // Desconecta o banco após o teste
    await prisma.$disconnect();
  });