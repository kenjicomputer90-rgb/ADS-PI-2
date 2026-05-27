import type { Request, Response } from "express"

export const listarEstoqueController = (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "Listar estoque funcionando",
  })
}

export const separarPecaController = (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "Separação de peça funcionando",
  })
}

export const conferirSaidaController = (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "Conferência de saída funcionando",
  })
}

export const conferirDevolucaoController = (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "Conferência de devolução funcionando",
  })
}

export const listarPreparacaoController = (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "Listar peças em preparação funcionando",
  })
}