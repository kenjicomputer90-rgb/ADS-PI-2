import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Semeando status padrões...");

  const statusDisponivel = await prisma.status_peca.upsert({
    where: { id_status: 1 },
    update: {},
    create: {
      id_status: 1,
      descricao: "Disponível",
    },
  });

  const statusAlugado = await prisma.status_peca.upsert({
    where: { id_status: 2 },
    update: {},
    create: {
      id_status: 2,
      descricao: "Alugado",
    },
  });

  const statusManutencao = await prisma.status_peca.upsert({
    where: { id_status: 3 },
    update: {},
    create: {
      id_status: 3,
      descricao: "Em Manutenção",
    },
  });

  const statusVendido = await prisma.status_peca.upsert({
    where: { id_status: 4 },
    update: {},
    create: {
      id_status: 4,
      descricao: "Vendido",
    },
  });

  const statusReservado = await prisma.status_peca.upsert({
    where: { id_status: 5 },
    update: {},
    create: {
      id_status: 5,
      descricao: "Reservado",
    },
  });

  const statusPreparacao = await prisma.status_peca.upsert({
    where: { id_status: 6 },
    update: {},
    create: {
      id_status: 6,
      descricao: "Em Preparação",
    },
  });

    const statusSaida = await prisma.status_peca.upsert({
    where: { id_status: 7 },
    update: {},
    create: {
      id_status: 7,
      descricao: "saida",
    },
  });

  console.log({
    statusDisponivel,
    statusAlugado,
    statusManutencao,
    statusVendido,
    statusReservado,
    statusPreparacao,
    statusSaida,
  });
  console.log({ statusDisponivel, statusAlugado, statusManutencao, statusVendido });

  // =========================================================================
  // PARTE DO FINANCEIRO: Dados adicionais para testar o fluxo de caixa
  // =========================================================================

  // 1. Criando usuários de teste para amarrar os registros
  const userAdmin = await prisma.usuario.upsert({
    where: { id_usuario: 1 },
    update: {},
    create: { id_usuario: 1, nome: "Admin", email: "admin@loja.com", senha: "123", perfil_acesso: "administrador" }
  });

  const userCliente = await prisma.usuario.upsert({
    where: { id_usuario: 2 },
    update: {},
    create: { id_usuario: 2, nome: "Carlos", email: "carlos@email.com", senha: "123", perfil_acesso: "CLIENTE" }
  });

  // 2. Criando funcionário com salário para testar custos/despesas
  await prisma.funcionario.upsert({
    where: { id_funcionario: 1 },
    update: {},
    create: {
      id_funcionario: 1,
      id_usuario: userAdmin.id_usuario,
      nome: "Laerte Dev",
      cpf: "111.111.111-11",
      telefone: "(19) 99999-1111",
      salario: 4500.00
    }
  });

  // 3. Criando cliente de teste
  await prisma.cliente.upsert({
    where: { id_cliente: 1 },
    update: {},
    create: {
      id_cliente: 1,
      id_usuario: userCliente.id_usuario,
      nome: "Carlos Silva",
      cpf: "222.222.222-22",
      telefone: "(19) 98888-2222",
      endereco: "Rua das Flores, 123"
    }
  });

  // 4. Criando locações de teste para simular o faturamento bruto e multas por atraso
  await prisma.locacao.upsert({
    where: { id_locacao: 1 },
    update: {},
    create: {
      id_locacao: 1,
      id_cliente: 1,
      id_usuario: 1,
      id_funcionario: 1,
      data_evento: new Date(),
      status: "FINALIZADA",
      preco_total: 250.00,
      multa: 0.00
    }
  });

  await prisma.locacao.upsert({
    where: { id_locacao: 2 },
    update: {},
    create: {
      id_locacao: 2,
      id_cliente: 1,
      id_usuario: 1,
      id_funcionario: 1,
      data_evento: new Date(),
      status: "Atraso Item Indisponível",
      preco_total: 300.00,
      multa: 60.00
    }
  });

  console.log("✨ Dados do módulo financeiro anexados com sucesso!");

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // process.exit(1);
  });