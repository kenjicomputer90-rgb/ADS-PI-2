import { Router } from "express"
import {
  criarLocacaoController,
  cancelarLocacaoController,
  entregarLocacaoController,
  devolverLocacaoController,
  trocarPecaController
} from "./locacaoController.js"

const locacaoRouter = Router()

locacaoRouter.post("/", criarLocacaoController)

locacaoRouter.post("/:id/cancelar", cancelarLocacaoController)

locacaoRouter.post("/:id/entrega", entregarLocacaoController)

locacaoRouter.post("/:id/devolucao", devolverLocacaoController)

locacaoRouter.post("/:id/troca", trocarPecaController)

export default locacaoRouter