import { Request, Response, NextFunction } from "express"
import { getUsuarioById } from "./adminService.js"

export async function ensureAdminRequester(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const requesterIdRaw = String(
      req.header("x-requester-id") ?? req.body.requesterId ?? req.query.requesterId ?? ""
    ).trim()

    if (!requesterIdRaw) {
      return res.status(401).json({ erro: "ID do usuário requisitante não informado" })
    }

    const requesterId = Number(requesterIdRaw)
    if (Number.isNaN(requesterId) || requesterId <= 0) {
      return res.status(400).json({ erro: "ID do usuário requisitante inválido" })
    }

    const usuario = await getUsuarioById(requesterId)
    if (!usuario || usuario.perfil_acesso !== "administrador") {
      return res.status(403).json({ erro: "Ação permitida apenas para administradores" })
    }

    res.locals.requesterId = requesterId
    next()
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro interno ao validar administrador" })
  }
}
