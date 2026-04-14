
import { Router } from "express"
import {addClienteController} from "./clienteController.js"

const clienteRouter = Router()

clienteRouter.post("/cliente", addClienteController)

export default clienteRouter