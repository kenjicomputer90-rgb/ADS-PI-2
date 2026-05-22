import { Router } from "express"
import {addProdutoController, changeProdutoController, listProdutoController, porcentagem_vendaController, precificaProdutoController, removeProdutoController, returnProdutoController} from "./produtoController.js"

const produtoRouter = Router()

produtoRouter.post("/", addProdutoController)

produtoRouter.get("/:id", returnProdutoController)

produtoRouter.delete("/", removeProdutoController)

produtoRouter.patch("/", changeProdutoController)

produtoRouter.get("/precificacao/:id", precificaProdutoController)

produtoRouter.get("/porcentagem_venda/:tipo/:tipo_buscado", porcentagem_vendaController)

produtoRouter.get("/listaProduto", listProdutoController)

export default produtoRouter