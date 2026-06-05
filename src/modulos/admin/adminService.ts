import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db",
})

const prisma = new PrismaClient({
  adapter,
})

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
  return await prisma.permissao.findMany({
    include: {
      usuarios: {
        select: {
          usuario: {
            select: {
              id_usuario: true,
              nome: true,
              email: true,
            },
          },
        },
      },
    },
  })
}

export async function updatePermissao(
  id: number,
  data: {
    nome?: string
    descricao?: string
    usuarioIds?: number[]
  }
) {
  const permissao = await prisma.permissao.findUnique({
    where: { id_permissao: id },
  })

  if (!permissao) {
    throw new Error("Permissão não encontrada")
  }

  const updated = await prisma.permissao.update({
    where: { id_permissao: id },
    data: {
      nome: data.nome ?? permissao.nome,
      descricao: data.descricao ?? permissao.descricao,
    },
    include: {
      usuarios: true,
    },
  })

  if (data.usuarioIds) {
    await prisma.usuario_permissao.deleteMany({
      where: { id_permissao: id },
    })

    await Promise.all(
      data.usuarioIds.map((id_usuario) =>
        prisma.usuario_permissao.create({
          data: {
            id_usuario,
            id_permissao: id,
          },
        })
      )
    )
  }

  return await prisma.permissao.findUnique({
    where: { id_permissao: id },
    include: {
      usuarios: {
        select: {
          usuario: {
            select: {
              id_usuario: true,
              nome: true,
              email: true,
            },
          },
        },
      },
    },
  })
}

export async function listAcoes() {
  return await prisma.acao.findMany({
    orderBy: {
      nome: "asc",
    },
  })
}

export async function listLogs() {
  return await prisma.log.findMany({
    orderBy: {
      data: "desc",
    },
    include: {
      usuario: {
        select: {
          id_usuario: true,
          nome: true,
          email: true,
          perfil_acesso: true,
        },
      },
      acao: true,
    },
  })
}

export async function logAction(
  usuarioId: number | undefined,
  nomeAcao: string,
  alvo?: string,
  detalhes?: string
) {
  const acao = await prisma.acao.upsert({
    where: { nome: nomeAcao },
    update: {},
    create: {
      nome: nomeAcao,
      descricao: nomeAcao,
    },
  })

  return await prisma.log.create({
    data: {
      id_usuario: usuarioId ?? null,
      id_acao: acao.id_acao,
      alvo: alvo ?? null,
      descricao: detalhes ?? null,
    },
  })
}
