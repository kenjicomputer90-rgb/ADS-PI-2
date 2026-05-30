import type { Request, Response } from "express"

export const listarKanbanController = (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "Kanban de processos funcionando",
  })
}

export const listarAtrasosController = (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "Listagem de atrasos funcionando",
  })
}

export const listarDevolucoesController = (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "Controle de devoluções funcionando",
  })
}

export const enviarAlertaAtrasoController = (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "Alerta de atraso funcionando",
  })
}