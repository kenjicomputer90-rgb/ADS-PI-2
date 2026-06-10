import type { Request, Response } from "express"

import {
  criarLocacao,
  cancelarLocacao,
  entregarLocacao,
  devolverLocacao,
  trocarPeca,
} from "./locacaoService.js"

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return "Erro interno no servidor"
}

export const criarLocacaoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      id_cliente,
      id_usuario,
      id_funcionario,
      id_peca,
      data_evento,
      preco_aluguel
    } = req.body

    const locacao = await criarLocacao({
      id_cliente: Number(id_cliente),
      id_usuario: Number(id_usuario),
      id_funcionario: Number(id_funcionario),
      id_peca: Number(id_peca),
      data_evento,
      preco_aluguel
    })

    res.status(201).json(locacao)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const cancelarLocacaoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id)

    const locacao = await cancelarLocacao(id)

    res.status(200).json(locacao)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const entregarLocacaoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id)

    const locacao = await entregarLocacao(id)

    res.status(200).json(locacao)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const devolverLocacaoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id)

    const locacao = await devolverLocacao(id)

    res.status(200).json(locacao)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const trocarPecaController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const { novaPecaId } = req.body

    const locacao = await trocarPeca(id, Number(novaPecaId))

    res.status(200).json(locacao)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}