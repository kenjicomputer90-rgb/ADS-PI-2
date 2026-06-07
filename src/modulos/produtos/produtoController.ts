import { Request, Response } from "express"
import { addProduto, changeProduto, precificaProduto, removeProduto, returnProduto, porcentagem_venda, listProduto, reservar, devolucao, troca, venda, saida, alterarStatus, produtosPorStatus, returnProdutoStatus} from "./produtosService.js"
import produtoRouter from "./produtosRouter.js"

export const addProdutoController = async( req: Request, res: Response) => {
  try {
    const { nome, material, descricao, preco, status, tamanho , cor } = req.body
    const produto = await addProduto(nome, material, descricao, preco, status, tamanho , cor)
    return res.status(201).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const removeProdutoController = async( req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const produto = await removeProduto(id)
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const returnProdutoController = async( req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const produto = await returnProduto(id)
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const returnProdutoStatusController = async( req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const produto = await returnProdutoStatus(id)
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const changeProdutoController = async( req: Request, res: Response) => {
  try {
    const id = Number(req.params)
    const { nome, material, descricao, preco, status } = req.body
    const produto= await changeProduto(id, {nome, material, descricao, preco, status})
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
export const precificaProdutoController = async( req: Request, res: Response) => {
  try {
    const { id } = req.body
    const produto= await precificaProduto(id)
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
export const porcentagem_vendaController = async( req: Request, res: Response) => {
  try {
    const {
      tipo,
      tipo_buscado,
    } = req.params as {
      tipo: "sexo" | "cor" | "tamanho"
      tipo_buscado: string
    } 
    const statusParam =  req.query.status
    const status = statusParam ? Number(statusParam) : 4

    const tiposPermitidosPorcentagemVenda = [
  "sexo",
  "cor",
  "tamanho",
  "material",
  "preco",
  "descricao"
] as const

    type TipoPermitidoPorcentagemVenda =
  typeof tiposPermitidosPorcentagemVenda[number]
    if (!tiposPermitidosPorcentagemVenda.includes(tipo as TipoPermitidoPorcentagemVenda)) {
      return res.status(400).json({
        erro: "Tipo inválido"
      })
    }

    const produto = await porcentagem_venda(tipo, tipo_buscado, status)
    //exemplo: cor, azul
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
export const listProdutoController = async( req: Request, res: Response) => {
  try {
    const produto = await listProduto()
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}
/*
export const updateProdutoStatusController =  async( req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { status }= req.body
    const produto = await updateProdutoStatus(id, status)
    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}*/

export const reservarProdutoController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id)

    const produto = await reservar(id)

    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const saidaProdutoController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id)

    const produto = await saida(id)

    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const devolucaoProdutoController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id)

    const produto = await devolucao(id)

    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const trocaProdutoController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id)

    const produto = await troca(id, req.body)

    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export const vendaProdutoController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id)

    const produto = await venda(id)

    return res.status(200).json(produto)
  } catch (error: any) {
    return res.status(400).json({ erro: error.message })
  }
}

export async function alterarStatusController(
  req: Request,
  res: Response
) {
  try {
    const idPeca = Number(req.params.id)
    const { id_status } = req.body

    const resultado = await alterarStatus(
      idPeca,
      id_status
    )

    return res.status(200).json(resultado)
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao alterar status"
    })
  }
}


export const produtosPorStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("teste")
    const status = Number(req.params.status)
    const produtos = await produtosPorStatus(status)

    return res.status(200).json(produtos)
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao listar produtos disponíveis"
    })
  }
}

/*
export const produtosOciososController = async (
  req: Request,
  res: Response
) => {
  try {
    const produtos = await produtosOciosos()

    return res.status(200).json(produtos)
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao listar produtos ociosos"
    })
  }
}
*/
/*
export const rastreioProdutoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { codigo } = req.params

    const produto = await rastreioProduto(codigo)

    if (!produto) {
      return res.status(404).json({
        erro: "Produto não encontrado"
      })
    }

    return res.status(200).json(produto)
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao rastrear produto"
    })
  }
}
  */