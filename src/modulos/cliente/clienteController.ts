
import { Request, Response } from "express"
import { addCliente, changeCliente, removeCliente, returnCliente } from "./clienteService.js"

export const addClienteController = ( req: Request, res: Response) => {
  try {
    const { nome, cpf, telefone, endereco, rg, data_nascimento} = req.body
    return res.status(201).json(addCliente(nome, cpf, telefone, endereco, rg, data_nascimento))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}


export const removeClienteController = ( req: Request, res: Response) => {
  try {
    const { id } = req.body
    return res.status(201).json(removeCliente(id))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const returnClienteController = ( req: Request, res: Response) => {
  try {
    const { id } = req.body
    return res.status(201).json(returnCliente(id))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const changeClienteController = ( req: Request, res: Response) => {
  try {
    const { id, nome, cpf, rg, data_nascimento } = req.body
    return res.status(201).json(changeCliente(id, nome, cpf,rg, data_nascimento))
    return res.status(201).json(returnCliente)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}