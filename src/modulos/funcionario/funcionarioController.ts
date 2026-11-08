
import { Request, Response } from "express"
import { returnFuncionario, changeFuncionario, removeFuncionario, addFuncionario } from "./funcionarioService.js"

export const addFuncionarioController = async (req: Request, res: Response) => {
  try {
    const { id_usuario, nome, cpf, rg, telefone, ctps, dependente, sexo, salario, data_nascimento, estado_civil } = req.body
    
    // Adicionado await e corrigido nomes das variáveis para bater com o Service
    const resultado = await addFuncionario(
      Number(id_usuario), nome, cpf, rg, telefone, ctps, 
      Number(dependente), sexo, Number(salario), data_nascimento, estado_civil
    )
    
    if (typeof resultado === "string") {
      return res.status(400).json({ erro: resultado })
    }
    
    return res.status(201).json(resultado)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
};

// 🟡 MANTIDO IDÊNTICO AO DO SEU GRUPO ABAIXO:
export const removeFuncionarioController = async (req: Request, res: Response) => {
  try {
    // Pegando o ID da URL para bater com o padrão REST
    const id = Number(req.params.id)
    const resultado = await removeFuncionario(id)
    return res.status(200).json(resultado)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
};

// 🟡 MANTIDO IDÊNTICO AO DO SEU GRUPO ABAIXO:
export const returnFuncionarioController = async (req: Request, res: Response) => {
  try {
    // Pegando o ID da URL params e executando a função corretamente com await
    const id = Number(req.params.id)
    const funcionario = await returnFuncionario(id)
    
    if (!funcionario) {
      return res.status(404).json({ erro: "Funcionário não encontrado" })
    }
    
    return res.status(200).json(funcionario)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
};

// 🟡 MANTIDO IDÊNTICO AO DO SEU GRUPO ABAIXO:
export const changeFuncionarioController = async (req: Request, res: Response) => {
  try {
    const { id_usuario, cpf, rg, telefone, ctps, dependente, sexo, salario, data_nascimento, estado_civil } = req.body
    const id = Number(req.params.id)
    
    const resultado = await changeFuncionario(
      id, id_usuario ? Number(id_usuario) : undefined, cpf, rg, telefone, ctps, 
      dependente ? Number(dependente) : undefined, sexo, salario ? Number(salario) : undefined, 
      data_nascimento, estado_civil
    )
    
    return res.status(200).json(resultado)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
};