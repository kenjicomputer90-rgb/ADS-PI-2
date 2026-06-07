import { Router } from "express"
import {addProdutoController, alterarStatusController, changeProdutoController,  listProdutoController, porcentagem_vendaController, precificaProdutoController, produtosManutencaoController, produtosPorStatusController, removeManutencaoController, removeProdutoController, reservarProdutoController, returnProdutoController, returnProdutoStatusController, saidaProdutoController, trocaProdutoController, vendaProdutoController} from "./produtoController.js"


const produtoRouter = Router()

produtoRouter.get("/precificacao/:id", precificaProdutoController)

produtoRouter.get("/porcentagem_venda/:tipo/:tipo_buscado", porcentagem_vendaController)

produtoRouter.get("/status/:status", produtosPorStatusController)

produtoRouter.post("/", addProdutoController)

produtoRouter.delete("/:id", removeProdutoController)

produtoRouter.delete("/removeManutencao/:id", removeManutencaoController)

produtoRouter.patch("/:id", changeProdutoController)

produtoRouter.get("/", listProdutoController)

produtoRouter.get("/buscaStatus/:id", returnProdutoStatusController)

produtoRouter.get("/:id", returnProdutoController)

produtoRouter.post("/produtosManutencao/:id_peca", produtosManutencaoController)


// Atributos específicos
//produtoRouter.post("/:id/fotos", addProdutoFotoController)
//produtoRouter.put("/:id/localizacao", updateProdutoLocalizacaoController)
//produtoRouter.put("/:id/status", updateProdutoStatusController)

// Movimentação
produtoRouter.patch(
  "/:id/status",
  alterarStatusController
)



// Manutenção / Problemas
// produtoRouter.post("/:id/defeitos", registrarDefeitoController)
// produtoRouter.post("/:id/manutencao", registrarManutencaoController)
// produtoRouter.post("/:id/ajustes", registrarAjusteController)

// Consultas específicas

//produtoRouter.get("/ociosos", produtosOciososController)
//produtoRouter.get("/rastreio/:codigo", rastreioProdutoController)


export default produtoRouter