
import { Request, Response } from "express"
import { addAdministrador, changeAdministrador, removeAdministrador, returnAdministrador } from "./administradorService.js"

export const addAdministradorController = async (req: Request, res: Response) => {
  try {
    const { nome, cpf, rg, data_nascimento, email, senha } = req.body
    const administrador = await addAdministrador(nome, cpf, rg, data_nascimento, email, senha)
    return res.status(201).json(administrador)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}


export const removeAdministradorController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const resultado = await removeAdministrador(Number(id))
    return res.status(200).json(resultado)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const returnAdministradorController = async (req: Request, res: Response) => {
  try {
    const id = req.body.id ? Number(req.body.id) : req.query.id ? Number(req.query.id) : undefined
    const administrador = await returnAdministrador(id)
    return res.status(200).json(administrador)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const changeAdministradorController = async (req: Request, res: Response) => {
  try {
    const { id, nome, cpf, rg, data_nascimento, email, senha } = req.body
    const administrador = await changeAdministrador(
      Number(id),
      nome,
      cpf,
      rg,
      data_nascimento,
      email,
      senha
    )
    return res.status(200).json(administrador)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}