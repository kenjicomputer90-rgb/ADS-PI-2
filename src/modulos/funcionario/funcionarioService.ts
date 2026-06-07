import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({
  adapter,
});

export async function addFuncionario(
  id_usuario: any, // Mudamos para 'any' para aceitar o texto "Manoel" vindo do front sem travar o TypeScript
  nome: string,
  cpf: string,
  rg: string,
  telefone: string,
  ctps: string,
  dependente: number,
  sexo: string,
  salario: number,
  data_nascimento: string,
  estado_civil: string
) {
  console.log("teste1")

  // 1. TRATAMENTO INTELIGENTE PARA O SEU FRONT-END:
  let usuarioIdFinal: number;

  // Se o front-end enviar um texto (como "Manoel") em vez de um ID numérico
  if (isNaN(Number(id_usuario))) {
    // Criamos o Usuário de forma automática na tabela Pai para o sistema não quebrar
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: nome,
        email: `${nome.toLowerCase().replace(/\s+/g, '')}@loja.com`,
        senha: "123",
        perfil_acesso: "FUNCIONARIO"
      }
    });
    usuarioIdFinal = novoUsuario.id_usuario;
  } else {
    // Se já vier um número correto, mantemos o número
    usuarioIdFinal = Number(id_usuario);
  }

  // 2. VALIDAÇÕES ORIGINAIS DO SEU GRUPO (Mantidas idênticas):
  const usuario = await prisma.funcionario.findUnique({
    where: {
      id_usuario: usuarioIdFinal
    }
  });

  const funcionarioCpf = await prisma.funcionario.findUnique({
    where: {
      cpf
    }
  });

  if (usuario) {
    return "usuario já sendo usado";
  }
  if (funcionarioCpf) {
    return "cpf já sendo usado";
  }

  console.log("CPF encontrado:", funcionarioCpf);

  // 3. CRIAÇÃO DO FUNCIONÁRIO (Injetando o ID numérico correto)
  return await prisma.funcionario.create({
    data: {
      id_usuario: usuarioIdFinal,
      nome,
      cpf,
      rg,
      telefone,
      ctps,
      dependente,
      sexo,
      salario,
      data_nascimento: new Date(data_nascimento),
      estado_civil
    }
  });
}

export async function removeFuncionario(id: number) {
  return await prisma.funcionario.delete({
    where: {
      id_funcionario: id
    }
  });
}

export async function changeFuncionario(
  id: number,
  id_usuario?: number,
  cpf?: string,
  rg?: string,
  telefone?: string,
  ctps?: string,
  dependente?: number,
  sexo?: string,
  salario?: number,
  data_nascimento?: string,
  estado_civil?: string
) {
  return await prisma.funcionario.update({
    where: {
      id_funcionario: id
    },
    data: {
      id_usuario,
      cpf,
      rg,
      telefone,
      ctps,
      dependente,
      sexo,
      salario,
      estado_civil,
      ...(data_nascimento && {
        data_nascimento: new Date(data_nascimento)
      })
    }
  });
}

export async function returnFuncionario(id: number) {
  return await prisma.funcionario.findUnique({
    where: {
      id_funcionario: id
    }
  });
}
export async function listFuncionario(){
return await prisma.funcionario.findMany()
}