import type { Request, Response } from "express"

import {
  listarKanban,
  listarAtrasos,
  listarDevolucoesPendentes,
  enviarAlertaAtraso,
} from "./processosService.js"

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return "Erro interno no servidor"
}

export const listarKanbanController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const kanban = await listarKanban()

    res.status(200).json(kanban)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const listarAtrasosController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const atrasos = await listarAtrasos()

    res.status(200).json(atrasos)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const listarDevolucoesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const devolucoes = await listarDevolucoesPendentes()

    res.status(200).json(devolucoes)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}

export const enviarAlertaAtrasoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const alerta = await enviarAlertaAtraso()

    res.status(200).json(alerta)
  } catch (error) {
    res.status(400).json({
      erro: getErrorMessage(error),
    })
  }
}