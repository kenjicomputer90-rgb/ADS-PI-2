import { Request, Response } from "express"
import { addProduto, changeProduto, precificaProduto, removeProduto, returnProduto, porcentagem_venda, listProduto} from "./produtosService.js"
import produtoRouter from "./produtosRouter.js"

export const addProdutoController = async( req: Request, res: Response) => {
  try {
    const { nome, material, descricao, preco, status, tamanho , cor } = req.body
    const produto = await addProduto(nome, material, descricao, preco, status, tamanho , cor)
    return res.status(201).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const removeProdutoController = async( req: Request, res: Response) => {
  try {
    const { id } = req.body
    const produto = await removeProduto(id)
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const returnProdutoController = async( req: Request, res: Response) => {
  try {
    const id = Number(req.params)
    const produto = await returnProduto(id)
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const changeProdutoController = async( req: Request, res: Response) => {
  try {
    const { id, nome, material, descricao, preco, status } = req.body
    const produto= await changeProduto(id, {nome, material, descricao, preco, status})
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
export const precificaProdutoController = async( req: Request, res: Response) => {
  try {
    const { id } = req.body
    const produto= await precificaProduto(id)
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
export const porcentagem_vendaController = async( req: Request, res: Response) => {
  try {
    const {
      tipo,
      tipo_buscado
    } = req.params as {
      tipo: "sexo" | "cor" | "tamanho"
      tipo_buscado: string
    }
    const produto = await porcentagem_venda(tipo, tipo_buscado)
    //exemplo: cor, azul
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
export const listProdutoController = async( req: Request, res: Response) => {
  try {
    const produto = await listProduto()
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}