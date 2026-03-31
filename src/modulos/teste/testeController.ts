
import { Request, Response } from "express"
import { addUser } from "./testeServices.js"

export function addUserController(req: Request, res: Response) {
  try {
    const { nome } = req.body

    const resultado = addUser(nome)

    res.status(201).json(resultado)
  } catch (error: any) {
    res.status(400).json({ erro: error.message })
  }
}