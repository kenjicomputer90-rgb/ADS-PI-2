import type { Request, Response } from "express"

import {
  listarEstoque,
  separarPeca,
  conferirSaida,
  conferirDevolucao,
  listarPecasEmPreparacao,
} from "./logisticaService.js"

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return "Erro interno no servidor"
}

export const listarEstoqueController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const estoque = await listarEstoque()

    res.status(200).json(estoque)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const separarPecaController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_peca } = req.body

    const resultado = await separarPeca(Number(id_peca))

    res.status(200).json(resultado)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const conferirSaidaController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_peca } = req.body

    const resultado = await conferirSaida(Number(id_peca))

    res.status(200).json(resultado)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const conferirDevolucaoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_peca, possuiAvaria } = req.body

    const resultado = await conferirDevolucao(
      Number(id_peca),
      Boolean(possuiAvaria)
    )

    res.status(200).json(resultado)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const listarPreparacaoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pecas = await listarPecasEmPreparacao()

    res.status(200).json(pecas)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}