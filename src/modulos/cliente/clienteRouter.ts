
import { Router } from "express"
import {addClienteController, changeClienteController, removeClienteController, returnClienteController} from "./clienteController.js"

const clienteRouter = Router()

clienteRouter.post("/", addClienteController)

clienteRouter.get("/:id", returnClienteController)

clienteRouter.delete("/", removeClienteController)

clienteRouter.patch("/", changeClienteController)

export default clienteRouter