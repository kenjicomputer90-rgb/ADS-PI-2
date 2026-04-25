
import { Router } from "express"
import {addFuncionarioController, changeFuncionarioController, removeFuncionarioController, returnFuncionarioController} from "./funcionarioController.js"

const funcionarioRouter = Router()

funcionarioRouter.post("/funcionario", addFuncionarioController)

funcionarioRouter.get("/funcionario", returnFuncionarioController  )

funcionarioRouter.delete("/funcionario", removeFuncionarioController)

funcionarioRouter.patch("/funcionario", changeFuncionarioController)

export default funcionarioRouter