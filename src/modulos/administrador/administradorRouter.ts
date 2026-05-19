
import { Router } from "express"
import {addAdministradorController, changeAdministradorController, removeAdministradorController, returnAdministradorController} from "./administradorController.js"

const administradorRouter = Router()

administradorRouter.post("/", addAdministradorController)

administradorRouter.get("/", returnAdministradorController)

administradorRouter.delete("/", removeAdministradorController)

administradorRouter.patch("/", changeAdministradorController)

export default administradorRouter