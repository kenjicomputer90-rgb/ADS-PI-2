
import { Request, Response } from "express"

import { returnFuncionario, changeFuncionario, removeFuncionario, addFuncionario } from "./fucionarioService.js"

export const addFuncionarioController = ( req: Request, res: Response) => {
  try {
    const { nome, cpf, cargo, rg, email, telefone, cpts,dependentes,sexo,salario, data_de_nascimento, estado_civil } = req.body
    return res.status(201).json(addFuncionario(nome, cpf, cargo, rg, email, telefone, cpts,dependentes,sexo,salario, data_de_nascimento, estado_civil))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const removeFuncionarioController = ( req: Request, res: Response) => {
  try {
    const { id } = req.body
    return res.status(201).json(removeFuncionario(id))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const returnFuncionarioController = ( req: Request, res: Response) => {
  try {
    const { id } = req.body
    return res.status(201).json(returnFuncionario)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const changeFuncionarioController = ( req: Request, res: Response) => {
  try {
    const { nome, cpf, cargo, rg, email, telefone, cpts,dependentes,sexo,salario, data_de_nascimento, estado_civil} = req.body
    return res.status(201).json(changeFuncionario(nome, cpf, cargo, rg, email, telefone, cpts,dependentes,sexo,salario, data_de_nascimento, estado_civil))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}