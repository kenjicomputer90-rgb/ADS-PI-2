import { Request, Response } from "express"
import { listFuncionarios, returnFuncionario, changeFuncionario, removeFuncionario, addFuncionario } from "./funcionarioService.js"

export const listFuncionariosController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json(await listFuncionarios());
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export const addFuncionarioController = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, cpf, rg, telefone, ctps, dependente, sexo, salario, data_nascimento, estado_civil } = req.body;

    const resultado = await addFuncionario(
      nome, email, senha, cpf, rg, telefone,
      ctps, Number(dependente ?? 0), sexo,
      Number(salario), data_nascimento, estado_civil
    );

    return res.status(201).json(resultado);
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export const removeFuncionarioController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    return res.status(200).json(await removeFuncionario(id));
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export const returnFuncionarioController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    return res.status(200).json(await returnFuncionario(id));
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export const changeFuncionarioController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { cpf, rg, telefone, ctps, dependente, sexo, salario, data_nascimento, estado_civil } = req.body;

    const resultado = await changeFuncionario(
      id, cpf, rg, telefone, ctps,
      dependente ? Number(dependente) : undefined, sexo,
      salario ? Number(salario) : undefined, data_nascimento, estado_civil
    );

    return res.status(200).json(resultado);
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}