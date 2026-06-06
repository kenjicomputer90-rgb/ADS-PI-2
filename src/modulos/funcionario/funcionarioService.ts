import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({ adapter });

function toISODate(date: string): string {
  return new Date(date.split('T')[0] + 'T12:00:00.000Z').toISOString();
}

export async function listFuncionarios() {
  return await prisma.funcionario.findMany({ orderBy: { nome: "asc" } });
}

export async function addFuncionario(
  nome: string,
  email: string,
  senha: string,
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
  const cpfEmUso = await prisma.funcionario.findUnique({ where: { cpf } });
  if (cpfEmUso) throw new Error("CPF já cadastrado");

  const emailEmUso = await prisma.usuario.findUnique({ where: { email } });
  if (emailEmUso) throw new Error("E-mail já cadastrado");

  // Transação: cria usuario e funcionario juntos — se um falhar, desfaz os dois
  return await prisma.$transaction(async (tx) => {
    const novoUsuario = await tx.usuario.create({
      data: {
        nome,
        email,
        senha,
        perfil_acesso: "funcionario"
      }
    });

    return await tx.funcionario.create({
      data: {
        id_usuario: novoUsuario.id_usuario,
        nome,
        cpf,
        rg,
        telefone,
        ctps,
        dependente,
        sexo,
        salario,
        data_nascimento: toISODate(data_nascimento),
        estado_civil
      }
    });
  });
}

export async function removeFuncionario(id: number) {
  const func = await prisma.funcionario.findUnique({ where: { id_funcionario: id } });
  if (!func) throw new Error("Funcionário não encontrado");

  // ON DELETE CASCADE no SQL já remove o funcionario quando o usuario é deletado
  return await prisma.usuario.delete({ where: { id_usuario: func.id_usuario } });
}

export async function changeFuncionario(
  id: number,
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
    where: { id_funcionario: id },
    data: {
      cpf,
      rg,
      telefone,
      ctps,
      dependente,
      sexo,
      salario,
      estado_civil,
      ...(data_nascimento && { data_nascimento: toISODate(data_nascimento) })
    }
  });
}

export async function returnFuncionario(id: number) {
  const func = await prisma.funcionario.findUnique({ where: { id_funcionario: id } });
  if (!func) throw new Error("Funcionário não encontrado");
  return func;
}