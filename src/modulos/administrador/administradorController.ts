
import { Request, Response } from "express"
import { addAdministrador, changeAdministrador, removeAdministrador, returnAdministrador } from "./administradorService.js"

export const addAdministradorController = ( req: Request, res: Response) => {
  try {
    const { nome, cpf, rg, data_nascimento } = req.body
    return res.status(201).json(addAdministrador(nome, cpf,rg, data_nascimento))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}


export const removeAdministradorController = ( req: Request, res: Response) => {
  try {
    const { id } = req.body
    return res.status(201).json(removeAdministrador(id))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const returnAdministradorController = ( req: Request, res: Response) => {
  try {
    const { id } = req.body
    return res.status(201).json(returnAdministrador(id))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const changeAdministradorController = ( req: Request, res: Response) => {
  try {
    const { id, nome, cpf, rg, data_nascimento } = req.body
    return res.status(201).json(changeAdministrador(id, nome, cpf,rg, data_nascimento))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}