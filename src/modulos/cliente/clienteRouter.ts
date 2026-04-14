
import { Router } from "express"
import {addClienteController, changeClienteController, removeClienteController, retornClienteController} from "./clienteController.js"

const clienteRouter = Router()

clienteRouter.post("/cliente", addClienteController)

clienteRouter.get("/cliente", retornClienteController)

clienteRouter.delete("/cliente", removeClienteController)

clienteRouter.patch("/cliente", changeClienteController)

export default clienteRouter