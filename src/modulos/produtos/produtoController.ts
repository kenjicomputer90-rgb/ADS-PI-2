import { Request, Response } from "express"
import {
  addProduto, changeProduto, precificaProduto, removeProduto, returnProduto,
  listProduto, updateProdutoStatus, reservar, devolucao, troca, venda, saida,
  alterarStatus, produtosPorStatus, porcentagem_venda,
  returnProdutoStatus,
  produtosManutencao
} from "./produtosService.js"
// ← import produtoRouter removido (não era usado)

export const addProdutoController = async (req: Request, res: Response) => {
  try {
    const { nome, material, descricao, preco, status, tamanho, cor } = req.body
    return res.status(201).json(await addProduto(nome, material, descricao, preco, status, tamanho, cor))
  } catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const removeProdutoController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)  // ← era req.params (bug NaN)
    return res.status(200).json(await removeProduto(id))
  } catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const returnProdutoController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    return res.status(200).json(await returnProduto(id))
  } catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const changeProdutoController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)  // ← era req.params (bug NaN)
    const { nome, material, descricao, preco, status } = req.body
    return res.status(200).json(await changeProduto(id, { nome, material, descricao, preco, status }))
  } catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const precificaProdutoController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await precificaProduto(Number(req.body.id)))
  } catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const porcentagem_vendaController = async (req: Request, res: Response) => {
  try {
    const { tipo, tipo_buscado } = req.params as { tipo: string; tipo_buscado: string }
    const status = req.query.status ? Number(req.query.status) : 4
    const tiposPermitidos = ["sexo", "cor", "tamanho", "material", "preco", "descricao"] as const
    if (!tiposPermitidos.includes(tipo as any)) return res.status(400).json({ erro: "Tipo inválido" })
    return res.status(200).json(await porcentagem_venda(tipo, tipo_buscado, status))
  } catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const listProdutoController = async (req: Request, res: Response) => {
  try { return res.status(200).json(await listProduto()) }
  catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const updateProdutoStatusController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { status } = req.body
    return res.status(200).json(await updateProdutoStatus(id, status))
  } catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const reservarProdutoController = async (req: Request, res: Response) => {
  try { return res.status(200).json(await reservar(Number(req.params.id))) }
  catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const saidaProdutoController = async (req: Request, res: Response) => {
  try { return res.status(200).json(await saida(Number(req.params.id))) }
  catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const devolucaoProdutoController = async (req: Request, res: Response) => {
  try { return res.status(200).json(await devolucao(Number(req.params.id))) }
  catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const trocaProdutoController = async (req: Request, res: Response) => {
  try { return res.status(200).json(await troca(Number(req.params.id), req.body)) }
  catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const vendaProdutoController = async (req: Request, res: Response) => {
  try { return res.status(200).json(await venda(Number(req.params.id))) }
  catch (error: any) { return res.status(400).json({ erro: error.message }) }
}

export const alterarStatusController = async (req: Request, res: Response) => {
  try {
    const idPeca = Number(req.params.id)
    const { id_status } = req.body
    return res.status(200).json(await alterarStatus(idPeca, id_status))
  } catch (error) { return res.status(500).json({ erro: "Erro ao alterar status" }) }
}

export const produtosPorStatusController = async (req: Request, res: Response) => {
  try {
    const status = Number(req.params.status)
    return res.status(200).json(await produtosPorStatus(status))
  } catch (error) { return res.status(500).json({ erro: "Erro ao listar produtos" }) }
}

export const returnProdutoStatusController = async( req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const produto = await returnProdutoStatus(id)
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const produtosManutencaoController = async (req: Request, res: Response) => {
  try {
    const id_peca = Number(req.params.id_peca)
    const {descricao, id_status} = req.body
    return res.status(200).json(await produtosManutencao(descricao,id_peca,id_status))
  } catch (error) { return res.status(500).json({ erro: "Erro ao listar produtos" }) }
}
