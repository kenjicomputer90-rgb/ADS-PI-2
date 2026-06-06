
import { Router } from "express"
import { addFuncionarioController, changeFuncionarioController, removeFuncionarioController, returnFuncionarioController } from "./funcionarioController.js"

const funcionarioRouter = Router()

// Criar funcionário
funcionarioRouter.post("/", addFuncionarioController)

// Buscar, Deletar e Editar agora esperam o ID na URL para conversar com as mudanças do Controller
funcionarioRouter.get("/:id", returnFuncionarioController)
funcionarioRouter.delete("/:id", removeFuncionarioController)
funcionarioRouter.patch("/:id", changeFuncionarioController)

export default funcionarioRouter