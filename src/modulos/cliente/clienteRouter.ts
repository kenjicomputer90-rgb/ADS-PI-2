
import { Router } from "express"
import {addClienteController, changeClienteController, removeClienteController, returnClienteController} from "./clienteController.js"

const clienteRouter = Router()

clienteRouter.post("/cliente", addClienteController)

clienteRouter.get("/cliente", returnClienteController)

clienteRouter.delete("/cliente", removeClienteController)

clienteRouter.patch("/cliente", changeClienteController)

export default clienteRouter