import { Router } from "express"
import {addProdutoController, alterarStatusController, changeProdutoController, devolucaoProdutoController, listProdutoController, porcentagem_vendaController, precificaProdutoController, removeProdutoController, reservarProdutoController, returnProdutoController, saidaProdutoController, trocaProdutoController, updateProdutoStatusController, vendaProdutoController} from "./produtoController.js"

const produtoRouter = Router()

produtoRouter.post("/", addProdutoController)

produtoRouter.delete("/:id", removeProdutoController)

produtoRouter.patch("/:id", changeProdutoController)

produtoRouter.get("/", listProdutoController)

produtoRouter.get("/precificacao/:id", precificaProdutoController)

produtoRouter.get("/porcentagem_venda/:tipo/:tipo_buscado", porcentagem_vendaController)

produtoRouter.get("/:id", returnProdutoController)



// Atributos específicos
//produtoRouter.post("/:id/fotos", addProdutoFotoController)
//produtoRouter.put("/:id/localizacao", updateProdutoLocalizacaoController)
produtoRouter.put("/:id/status", updateProdutoStatusController)

// Movimentação
produtoRouter.post("/:id/reservar", reservarProdutoController)
produtoRouter.post("/:id/saida", saidaProdutoController)
produtoRouter.post("/:id/devolucao", devolucaoProdutoController)
produtoRouter.post("/:id/troca", trocaProdutoController)
produtoRouter.post("/:id/venda", vendaProdutoController)

// Manutenção / Problemas
// produtoRouter.post("/:id/defeitos", registrarDefeitoController)
// produtoRouter.post("/:id/manutencao", registrarManutencaoController)
// produtoRouter.post("/:id/ajustes", registrarAjusteController)

// Consultas específicas
// produtoRouter.get("/disponiveis", produtosDisponiveisController)
// produtoRouter.get("/ociosos", produtosOciososController)
// produtoRouter.get("/rastreio/:codigo", rastreioProdutoController)

produtoRouter.patch(
  "/:id/status",
  alterarStatusController
)


export default produtoRouter