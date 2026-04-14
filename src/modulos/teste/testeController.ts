
import { Request, Response } from "express"
import { addUser } from "./testeServices.js"

export const addUserController = ( req: Request, res: Response) => {
  try {
    const { nome, cpf, rg, data_nacimento } = req.body
    return res.status(201).json(addUser(nome))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}