import { Router } from "express"

import {
  listarKanbanController,
  listarAtrasosController,
  listarDevolucoesController,
  enviarAlertaAtrasoController,
} from "./processosController.js"

const processosRouter = Router()

processosRouter.get("/kanban", listarKanbanController)

processosRouter.get("/atrasos", listarAtrasosController)

processosRouter.get("/devolucoes", listarDevolucoesController)

processosRouter.post("/alerta-atraso", enviarAlertaAtrasoController)

export default processosRouter