
import { Router } from "express"
import {addClienteController, changeClienteController, removeClienteController, 
returnClienteController, getClientPedidosController,
getClientProdutosController, consultaHistoricoLocacaoClienteController, 
consultaPreferenciasClienteController} from "./clienteController.js"

const clienteRouter = Router()

clienteRouter.post("/", addClienteController)

clienteRouter.get("/:id", returnClienteController)

clienteRouter.delete("/:id", removeClienteController)

clienteRouter.patch("/:id", changeClienteController)

clienteRouter.get("/:id/pedidos", getClientPedidosController)

clienteRouter.get("/:id/produtos",getClientProdutosController)

clienteRouter.get("/:id/historico", consultaHistoricoLocacaoClienteController)

clienteRouter.get("/:id/preferencias", consultaPreferenciasClienteController)

export default clienteRouter