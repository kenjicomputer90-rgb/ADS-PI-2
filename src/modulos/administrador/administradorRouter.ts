
import { Router } from "express"
import {
  addAdministradorController,
  changeAdministradorController,
  removeAdministradorController,
  returnAdministradorController,
} from "./administradorController.js"
import { ensureAdministradorRequester } from "./administradorAuth.js"

const administradorRouter = Router()

administradorRouter.use(ensureAdministradorRequester)

administradorRouter.post("/", addAdministradorController)

administradorRouter.get("/", returnAdministradorController)

administradorRouter.delete("/", removeAdministradorController)

administradorRouter.patch("/", changeAdministradorController)

export default administradorRouter