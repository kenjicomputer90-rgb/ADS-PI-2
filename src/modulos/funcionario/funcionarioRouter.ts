import { Router } from "express"
import {
  addFuncionarioController,
  changeFuncionarioController,
  removeFuncionarioController,
  returnFuncionarioController,
  listFuncionarioController // <-- Importa o novo controller de listar todos
} from "./funcionarioController.js"

const funcionarioRouter = Router()

// Listar todos os funcionários (ADICIONADO!)
funcionarioRouter.get("/", listFuncionarioController)

// Criar funcionário
funcionarioRouter.post("/", addFuncionarioController)

// Buscar, Deletar e Editar agora esperam o ID na URL para conversar com as mudanças do Controller
funcionarioRouter.get("/:id", returnFuncionarioController)
funcionarioRouter.delete("/:id", removeFuncionarioController)
funcionarioRouter.patch("/:id", changeFuncionarioController)

export default funcionarioRouter