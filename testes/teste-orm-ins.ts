import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
 url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("-> Conectando ao MySQL e testando inserir um registro via ORM...");

    const novoUsuario = await prisma.usuario.create({
    data: {
      nome: "Laerte Reis",
      email: "laerte.reis@teste.com",
      senha: "123",
      perfil_acesso: "CONTABILIDADE"
    }
  });

  console.log("-> SUCESSO ABSOLUTO! Registro gravado com o ID:", novoUsuario.id_usuario);
}

main()
  .catch((erro) => {
    console.error("❌ ERRO DA ORM:", erro.message);
  })
  .finally(async () => {
    // Desconecta o banco após o teste
    await prisma.$disconnect();
  });