
import { Request, Response } from "express"
import { listClientes, addCliente, changeCliente, removeCliente, returnCliente,
  getClientPedidos, getClientProdutos, consultaHistoricoLocacaoCliente, 
  consultaPreferenciasCliente
 } from "./clienteService.js"

export const listClientesController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await listClientes())
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

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
    const id = Number (req.params.id)
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
    const id = Number(req.params.id)
    const { nome, cpf, telefone, endereco, rg, data_nascimento} = req.body
    const clienteAtualizado = await changeCliente(id, nome, cpf, telefone, endereco, rg, data_nascimento )
    return res.status(200).json(clienteAtualizado)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const getClientPedidosController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const pedidos = await getClientPedidos(id)

    return res.status(200).json(pedidos)
  } catch (error: any) {
    return res.status(400).json({
      erro: error.message
    })
  }
}

export const getClientProdutosController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const produtos = await getClientProdutos(id)

    return res.status(200).json(produtos)
  } catch (error: any) {
    return res.status(400).json({
      erro: error.message
    })
  }
}

export const consultaHistoricoLocacaoClienteController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const historico = await consultaHistoricoLocacaoCliente(id)

    return res.status(200).json(historico)
  } catch (error: any) {
    return res.status(400).json({
      erro: error.message
    })
  }
}

export const consultaPreferenciasClienteController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const preferencias = await consultaPreferenciasCliente(id)

    return res.status(200).json(preferencias)
  } catch (error: any) {
    return res.status(400).json({
      erro: error.message
    })
  }
}