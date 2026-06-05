
import { Router } from "express"
import {addFuncionarioController, changeFuncionarioController, removeFuncionarioController, returnFuncionarioController} from "./funcionarioController.js"

const funcionarioRouter = Router()

funcionarioRouter.post("/", addFuncionarioController)

funcionarioRouter.get("/", returnFuncionarioController)

funcionarioRouter.delete("/", removeFuncionarioController)

funcionarioRouter.patch("/", changeFuncionarioController)

export default funcionarioRouter