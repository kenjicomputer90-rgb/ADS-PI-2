import { Router } from "express"

import {
  listarEstoqueController,
  separarPecaController,
  conferirSaidaController,
  conferirDevolucaoController,
  listarPreparacaoController,
} from "./logisticaController.js"

const logisticaRouter = Router()

logisticaRouter.get("/estoque", listarEstoqueController)

logisticaRouter.post("/separacao", separarPecaController)

logisticaRouter.post("/conferencia-saida", conferirSaidaController)

logisticaRouter.post("/conferencia-devolucao", conferirDevolucaoController)

logisticaRouter.get("/preparacao", listarPreparacaoController)

export default logisticaRouter