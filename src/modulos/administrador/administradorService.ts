import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
})

const prisma = new PrismaClient({
  adapter,
})

// Create a user with perfil_acesso = 'administrador'
export async function addAdministrador(
  nome: string,
  _cpf: string,
  _rg: string,
  _data_nascimento: string,
  email: string,
  senha: string
) {
  const usuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha,
      perfil_acesso: "administrador",
    },
  })

  return usuario
}

export async function removeAdministrador(id: number) {
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: id },
  })

  if (!usuario) {
    throw new Error("Administrador não encontrado")
  }

  if (usuario.perfil_acesso !== "administrador") {
    throw new Error("O usuário não é um administrador")
  }

  await prisma.usuario.delete({
    where: { id_usuario: id },
  })

  return { message: "Administrador removido", id }
}

export async function returnAdministrador(id?: number) {
  if (!id) {
    return await prisma.usuario.findMany({
      where: { perfil_acesso: "administrador" },
    })
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: id },
  })

  if (!usuario || usuario.perfil_acesso !== "administrador") {
    throw new Error("Administrador não encontrado")
  }

  return usuario
}

export async function changeAdministrador(
  id: number,
  nome?: string,
  _cpf?: string,
  _rg?: string,
  _data_nascimento?: string,
  email?: string,
  senha?: string
) {
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: id },
  })

  if (!usuario) {
    throw new Error("Administrador não encontrado")
  }

  if (usuario.perfil_acesso !== "administrador") {
    throw new Error("O usuário não é um administrador")
  }

  const data: {
    nome?: string
    email?: string
    senha?: string
  } = {}

  if (nome !== undefined) data.nome = nome
  if (email !== undefined) data.email = email
  if (senha !== undefined) data.senha = senha

  const updated = await prisma.usuario.update({
    where: { id_usuario: id },
    data,
  })

  return updated
}
