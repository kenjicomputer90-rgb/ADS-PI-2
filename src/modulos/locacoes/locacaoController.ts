import { Request, Response } from "express"

export const criarLocacaoController = (req: Request, res: Response) => {
  return res.status(200).json({
    mensagem: "Criar locação funcionando"
  })
}

export const cancelarLocacaoController = (req: Request, res: Response) => {
  return res.status(200).json({
    mensagem: "Cancelar locação funcionando"
  })
}

export const entregarLocacaoController = (req: Request, res: Response) => {
  return res.status(200).json({
    mensagem: "Entregar locação funcionando"
  })
}

export const devolverLocacaoController = (req: Request, res: Response) => {
  return res.status(200).json({
    mensagem: "Devolver locação funcionando"
  })
}

export const trocarPecaController = (req: Request, res: Response) => {
  return res.status(200).json({
    mensagem: "Trocar peça funcionando"
  })
}