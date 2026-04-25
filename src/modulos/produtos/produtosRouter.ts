import { Router } from "express"
import {addProdutoController, changeProdutoController, getProdutoController, porcentagem_vendaController, precificaProdutoController, removeProdutoController, returnProdutoController} from "./produtoController.js"

const produtoRouter = Router()

produtoRouter.post("/produto", addProdutoController)

produtoRouter.get("/produto", returnProdutoController)

produtoRouter.delete("/produto", removeProdutoController)

produtoRouter.patch("/produto", changeProdutoController)

produtoRouter.get("/precificacao", precificaProdutoController)

produtoRouter.get("/porcentagem_venda", porcentagem_vendaController)

produtoRouter.get("/getproduto", getProdutoController)

export default produtoRouter