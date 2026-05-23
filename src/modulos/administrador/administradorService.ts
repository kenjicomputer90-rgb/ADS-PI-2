import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
})

const prisma = new PrismaClient({
  adapter,
})

export async function addAdministrador(
  nome: string,
  cpf: string,
  rg: string,
  data_nascimento: string,
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

  const administrador = await prisma.administrador.create({
    data: {
      id_usuario: usuario.id_usuario,
      nome,
      cpf,
      rg,
      data_nascimento: new Date(data_nascimento),
    },
    include: {
      usuario: true,
    },
  })

  return administrador
}

export async function removeAdministrador(id: number) {
  const administrador = await prisma.administrador.findUnique({
    where: { id_administrador: id },
  })

  if (!administrador) {
    throw new Error("Administrador não encontrado")
  }

  await prisma.administrador.delete({
    where: { id_administrador: id },
  })

  await prisma.usuario.delete({
    where: { id_usuario: administrador.id_usuario },
  })

  return { message: "Administrador removido", id }
}

export async function returnAdministrador(id?: number) {
  if (!id) {
    return await prisma.administrador.findMany({
      include: {
        usuario: true,
      },
    })
  }

  const administrador = await prisma.administrador.findUnique({
    where: { id_administrador: id },
    include: {
      usuario: true,
    },
  })

  if (!administrador) {
    throw new Error("Administrador não encontrado")
  }

  return administrador
}

export async function changeAdministrador(
  id: number,
  nome?: string,
  cpf?: string,
  rg?: string,
  data_nascimento?: string,
  email?: string,
  senha?: string
) {
  const administrador = await prisma.administrador.findUnique({
    where: { id_administrador: id },
  })

  if (!administrador) {
    throw new Error("Administrador não encontrado")
  }

  const administradorData: {
    nome?: string
    cpf?: string
    rg?: string
    data_nascimento?: Date
  } = {}

  if (nome !== undefined) administradorData.nome = nome
  if (cpf !== undefined) administradorData.cpf = cpf
  if (rg !== undefined) administradorData.rg = rg
  if (data_nascimento !== undefined) administradorData.data_nascimento = new Date(data_nascimento)

  const usuarioData: {
    nome?: string
    email?: string
    senha?: string
  } = {}

  if (nome !== undefined) usuarioData.nome = nome
  if (email !== undefined) usuarioData.email = email
  if (senha !== undefined) usuarioData.senha = senha

  const updatedAdministrador = await prisma.administrador.update({
    where: { id_administrador: id },
    data: administradorData,
  })

  const updatedUsuario =
    Object.keys(usuarioData).length > 0
      ? await prisma.usuario.update({
          where: { id_usuario: administrador.id_usuario },
          data: usuarioData,
        })
      : undefined

  return {
    ...updatedAdministrador,
    usuario: updatedUsuario,
  }
}
