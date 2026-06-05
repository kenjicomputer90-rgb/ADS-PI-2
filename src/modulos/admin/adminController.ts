import { Request, Response } from "express"
import {
  createUsuario,
  listUsuarios,
  updateUsuario,
  deleteUsuario,
  listPermissoes,
  updatePermissao,
  listLogs,
  listAcoes,
  logAction,
} from "./adminService.js"

function getRequesterId(req: Request, res: Response) {
  return Number(res.locals.requesterId || req.header("x-requester-id") || req.body.requesterId || req.query.requesterId)
}

export const createUsuarioController = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, perfil_acesso } = req.body
    const usuario = await createUsuario({ nome, email, senha, perfil_acesso })
    const requesterId = getRequesterId(req, res)
    await logAction(requesterId, "CRIAR_USUARIO", `usuario:${usuario.id_usuario}`, JSON.stringify({ nome, email, perfil_acesso }))
    return res.status(201).json(usuario)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const getUsuariosController = async (req: Request, res: Response) => {
  try {
    const usuarios = await listUsuarios()
    return res.status(200).json(usuarios)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const updateUsuarioController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { nome, email, senha, perfil_acesso } = req.body
    const usuario = await updateUsuario(id, { nome, email, senha, perfil_acesso })
    const requesterId = getRequesterId(req, res)
    await logAction(requesterId, "ATUALIZAR_USUARIO", `usuario:${id}`, JSON.stringify({ nome, email, perfil_acesso }))
    return res.status(200).json(usuario)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const deleteUsuarioController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const resultado = await deleteUsuario(id)
    const requesterId = getRequesterId(req, res)
    await logAction(requesterId, "EXCLUIR_USUARIO", `usuario:${id}`, JSON.stringify(resultado))
    return res.status(200).json(resultado)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const getPermissoesController = async (req: Request, res: Response) => {
  try {
    const permissoes = await listPermissoes()
    return res.status(200).json(permissoes)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const updatePermissaoController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { nome, descricao, usuarioIds } = req.body
    const permissao = await updatePermissao(id, { nome, descricao, usuarioIds })
    const requesterId = getRequesterId(req, res)
    await logAction(requesterId, "ATUALIZAR_PERMISSAO", `permissao:${id}`, JSON.stringify({ nome, descricao, usuarioIds }))
    return res.status(200).json(permissao)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const getLogsController = async (req: Request, res: Response) => {
  try {
    const logs = await listLogs()
    return res.status(200).json(logs)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const getAcoesController = async (req: Request, res: Response) => {
  try {
    const acoes = await listAcoes()
    return res.status(200).json(acoes)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
