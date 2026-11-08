import { Router } from "express"
import { listFuncionariosController, addFuncionarioController, changeFuncionarioController, removeFuncionarioController, returnFuncionarioController } from "./funcionarioController.js"

const funcionarioRouter = Router()

funcionarioRouter.get("/", listFuncionariosController)      // ← listagem que o front chama
funcionarioRouter.post("/", addFuncionarioController)
funcionarioRouter.get("/:id", returnFuncionarioController)
funcionarioRouter.delete("/:id", removeFuncionarioController)
funcionarioRouter.patch("/:id", changeFuncionarioController)

export default funcionarioRouter