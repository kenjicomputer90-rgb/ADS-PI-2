
import { Request, Response } from "express"
import { addCliente } from "./clienteService.js"

export const addClienteController = ( req: Request, res: Response) => {
  try {
    const { nome, cpf, rg, data_nascimento } = req.body
    return res.status(201).json(addCliente(nome, cpf,rg, data_nascimento))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}