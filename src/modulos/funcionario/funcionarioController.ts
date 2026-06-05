
import { Request, Response } from "express"

import { returnFuncionario, changeFuncionario, removeFuncionario, addFuncionario } from "./funcionarioService.js"

export const addFuncionarioController = ( req: Request, res: Response) => {
  try {
    const { id_usuario, nome, cpf, rg, telefone, cpts,dependente,sexo,salario, data_de_nascimento, estado_civil } = req.body
    return res.status(201).json(addFuncionario(id_usuario, nome, cpf, rg, telefone, cpts,dependente,sexo,salario, data_de_nascimento, estado_civil))
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
    console.log("o")
    return res.status(201).json(returnFuncionario)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const changeFuncionarioController = ( req: Request, res: Response) => {
  try {
    const { id_usuario, cpf, cargo, rg, telefone, cpts,dependente,sexo,salario, data_de_nascimento, estado_civil} = req.body
    const id = Number(req.params.id)
    return res.status(201).json(changeFuncionario(id,id_usuario, cpf, rg, telefone, cpts,dependente,sexo,salario, data_de_nascimento, estado_civil))
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}