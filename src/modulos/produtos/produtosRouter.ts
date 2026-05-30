import { Router } from "express"
import {addProdutoController, changeProdutoController, listProdutoController, porcentagem_vendaController, precificaProdutoController, removeProdutoController, returnProdutoController} from "./produtoController.js"

const produtoRouter = Router()

produtoRouter.post("/", addProdutoController)

produtoRouter.delete("/", removeProdutoController)

produtoRouter.patch("/", changeProdutoController)

produtoRouter.get("/", listProdutoController)

produtoRouter.get("/precificacao/:id", precificaProdutoController)

produtoRouter.get("/porcentagem_venda/:tipo/:tipo_buscado", porcentagem_vendaController)

produtoRouter.get("/:id", returnProdutoController)

export default produtoRouter