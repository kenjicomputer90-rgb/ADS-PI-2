
import { Router } from "express"
import {addAdministradorController, changeAdministradorController, removeAdministradorController, returnAdministradorController} from "./administradorController.js"

const administradorRouter = Router()

administradorRouter.post("/administrador", addAdministradorController)

administradorRouter.get("/administrador", returnAdministradorController)

administradorRouter.delete("/administrador", removeAdministradorController)

administradorRouter.patch("/administrador", changeAdministradorController)

export default administradorRouter