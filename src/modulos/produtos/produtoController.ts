import { Request, Response } from "express"
import { addProduto, changeProduto, precificaProduto, removeProduto, returnProduto, porcentagem_venda, listProduto} from "./produtosService.js"

export const addProdutoController = ( req: Request, res: Response) => {
  try {
    const { nome, material, descricao, preco, status, tamanho , cor } = req.body
    return res.status(201).json(addProduto(nome, material, descricao, preco, status, tamanho , cor))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const removeProdutoController = ( req: Request, res: Response) => {
  try {
    const { id } = req.body
    return res.status(201).json(removeProduto(id))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const returnProdutoController = ( req: Request, res: Response) => {
  try {
    const { id } = req.body
    return res.status(201).json(returnProduto(id))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const changeProdutoController = ( req: Request, res: Response) => {
  try {
    const { id, nome, material, descricao, preco, status } = req.body
    return res.status(201).json(changeProduto(id, nome, material, descricao, preco, status))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
export const precificaProdutoController = ( req: Request, res: Response) => {
  try {
    const { id } = req.body
    return res.status(201).json(precificaProduto(id))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
export const porcentagem_vendaController = ( req: Request, res: Response) => {
  try {
    const { tipo } = req.body
    return res.status(201).json(porcentagem_venda(tipo))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
export const listProdutoController = ( req: Request, res: Response) => {
  try {
    return res.status(201).json(listProduto())
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}