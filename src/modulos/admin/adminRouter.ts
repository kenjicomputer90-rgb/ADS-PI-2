import { Router } from "express"
import { ensureAdminRequester } from "./adminAuth.js"
import {
  createUsuarioController,
  getUsuariosController,
  updateUsuarioController,
  deleteUsuarioController,
  getPermissoesController,
  updatePermissaoController,
  getLogsController,
  getAcoesController,
} from "./adminController.js"

const adminRouter = Router()

adminRouter.use(ensureAdminRequester)

adminRouter.post("/usuarios", createUsuarioController)
adminRouter.get("/usuarios", getUsuariosController)
adminRouter.put("/usuarios/:id", updateUsuarioController)
adminRouter.delete("/usuarios/:id", deleteUsuarioController)

adminRouter.get("/permissoes", getPermissoesController)
adminRouter.put("/permissoes/:id", updatePermissaoController)

adminRouter.get("/logs", getLogsController)
adminRouter.get("/acoes", getAcoesController)

export default adminRouter
