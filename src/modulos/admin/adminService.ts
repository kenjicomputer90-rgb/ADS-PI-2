import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db",
})

const prisma = new PrismaClient({
  adapter,
})

const actionTypes = [
  "CRIAR_USUARIO",
  "ATUALIZAR_USUARIO",
  "EXCLUIR_USUARIO",
  "ATUALIZAR_PERMISSAO",
]

const auditLogs: Array<{
  id_log: number
  id_usuario?: number | undefined
  acao: string
  alvo?: string | undefined
  descricao?: string | undefined
  data: string
}> = []

let nextLogId = 1

export async function listUsuarios() {
  return await prisma.usuario.findMany({
    select: {
      id_usuario: true,
      nome: true,
      email: true,
      perfil_acesso: true,
    },
  })
}

export async function createUsuario(data: {
  nome: string
  email: string
  senha: string
  perfil_acesso: string
}) {
  return await prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      perfil_acesso: data.perfil_acesso,
    },
    select: {
      id_usuario: true,
      nome: true,
      email: true,
      perfil_acesso: true,
    },
  })
}

export async function updateUsuario(
  id: number,
  data: {
    nome?: string
    email?: string
    senha?: string
    perfil_acesso?: string
  }
) {
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: id },
  })

  if (!usuario) {
    throw new Error("Usuário não encontrado")
  }

  const updated = await prisma.usuario.update({
    where: { id_usuario: id },
    data: {
      nome: data.nome ?? usuario.nome,
      email: data.email ?? usuario.email,
      senha: data.senha ?? usuario.senha,
      perfil_acesso: data.perfil_acesso ?? usuario.perfil_acesso,
    },
    select: {
      id_usuario: true,
      nome: true,
      email: true,
      perfil_acesso: true,
    },
  })

  return updated
}

export async function deleteUsuario(id: number) {
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: id },
  })

  if (!usuario) {
    throw new Error("Usuário não encontrado")
  }

  await prisma.usuario.delete({
    where: { id_usuario: id },
  })

  return { message: "Usuário deletado", id }
}

export async function listPermissoes() {
  const perfis = await prisma.usuario.findMany({
    distinct: ["perfil_acesso"],
    select: {
      perfil_acesso: true,
    },
  })

  return perfis.map((item) => item.perfil_acesso)
}

export async function updatePermissao(
  id: number,
  data: {
    perfil_acesso?: string
  }
) {
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: id },
  })

  if (!usuario) {
    throw new Error("Usuário não encontrado")
  }

  const updated = await prisma.usuario.update({
    where: { id_usuario: id },
    data: {
      perfil_acesso: data.perfil_acesso ?? usuario.perfil_acesso,
    },
    select: {
      id_usuario: true,
      nome: true,
      email: true,
      perfil_acesso: true,
    },
  })

  return updated
}

export async function listAcoes() {
  return actionTypes.map((nome) => ({ nome, descricao: nome }))
}

export async function listLogs() {
  return auditLogs
}

export async function logAction(
  usuarioId: number | undefined,
  nomeAcao: string,
  alvo?: string,
  detalhes?: string
) {
  const log = {
    id_log: nextLogId++,
    id_usuario: usuarioId,
    acao: nomeAcao,
    alvo: alvo ?? undefined,
    descricao: detalhes ?? undefined,
    data: new Date().toISOString(),
  }

  auditLogs.unshift(log)
  return log
}
