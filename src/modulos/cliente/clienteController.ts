
import { Request, Response } from "express"
import { addCliente, changeCliente, removeCliente, returnCliente } from "./clienteService.js"


// ... mantenha os outros controllers abaixo

export const addClienteController = async ( req: Request, res: Response) => {
  try {
    const { nome, cpf, telefone, endereco, rg, data_nascimento} = req.body
    const novoCliente = await addCliente(nome, cpf, telefone, endereco, rg, data_nascimento)
    return res.status(201).json(novoCliente)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}


export const removeClienteController = async ( req: Request, res: Response) => {
  try {
    const { id } = req.body
    const clienteRemovido = await removeCliente(id)
    return res.status(200).json(clienteRemovido)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const returnClienteController = async ( req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const cliente = await returnCliente(id)
    return res.status(200).json(cliente)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const changeClienteController = async ( req: Request, res: Response) => {
  try {
    const { id, nome, cpf, telefone, endereco, rg, data_nascimento } = req.body
    const clienteAtualizado = await changeCliente(id, nome, cpf, telefone, endereco, rg, data_nascimento )
    return res.status(200).json(clienteAtualizado)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}