import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({
  adapter,
});

export async function addProduto(nome:string, material:string, descricao:string, preco:number, status:"alugado"|"disponível"|"à venda"|"em manutenção", tamanho:number , cor:string, foto?:string){
  const newProduto = await prisma.peca_produto.create({
  data: {
    codigo_unico:  nome,       
    descricao: descricao,
    tamanho:  String(tamanho),
    cor: cor,     
    material: material,
    preco: preco,     
    historico_peca:{   
    create:{
        id_status:1,
        data_inicio: new Date(),
      },    
    },
  },
    include:{
        historico_peca: true
    }
  });
  return newProduto
}

export async function removeProduto(id: number) {
  return await prisma.peca_produto.delete({
    where: {
      id_peca: id
    }
  })
}

export async function listProduto() {
  const produtos = await prisma.peca_produto.findMany({
    include: {
      historico_peca: true
    }
  })
  return produtos
}

export async function precificaProduto(id: number) {
  const produto = await prisma.peca_produto.findUnique({
    where: {
      id_peca: id
    }
  })

  if (!produto) {
    throw new Error("Produto não encontrado")
  }

  return {
    id: produto.id_peca,
    preco: produto.preco
  }
}

export async function porcentagem_venda(tipo: string, tipo_buscado:string) {
  const total = await prisma.peca_produto.count()
  console.log(tipo_buscado)
  const vendidos = await prisma.peca_produto.count({
    where: {
      [tipo]: tipo_buscado
    }
  })

  if (total === 0) {
    return {
      porcentagem: 0
    }
  }
  console.log("teste: "+vendidos+" "+total)
  return {
    porcentagem: (vendidos / total) * 100
  }
}

export async function returnProduto(id: number) {
  const produto = await prisma.peca_produto.findUnique({
    where: {
      id_peca: id
    },
    include: {
      historico_peca: true
    }
  })

  if (!produto) {
    throw new Error("Produto não encontrado")
  }

  return produto
}

export async function changeProduto(
  id: number,
  data: {
    nome?: string
    material?: string
    descricao?: string
    preco?: number
    status?: string
    tamanho?: number
    cor?: string
  }
  ) {
  const filteredData = Object.fromEntries(
    Object.entries({
      codigo_unico: data.nome,
      material: data.material,
      descricao: data.descricao,
      preco: data.preco,
      status: data.status,
      tamanho: data.tamanho ? String(data.tamanho) : undefined,
      cor: data.cor
    }).filter(([_, value]) => value !== undefined)
  )

  return await prisma.peca_produto.update({
    where: {
      id_peca: id
    },
    data: filteredData,
    include: {
      historico_peca: true
    }
  })
}

export async function reservar(id: number) {
  return await prisma.peca_produto.update({
    where: {
      id_peca: id
    },
    data: {
      status: "alugado"
    }
  })
}

export async function devolucao(id: number) {
  return await prisma.peca_produto.update({
    where: {
      id_peca: id
    },
    data: {
      status: "disponível"
    }
  })
}

export async function venda(id: number) {
  return await prisma.peca_produto.update({
    where: {
      id_peca: id
    },
    data: {
      status: "à venda"
    }
  })
}

export async function troca(
  id: number,
  data: {
    nome?: string
    material?: string
    descricao?: string
    preco?: number
    tamanho?: number
    cor?: string
  }
) {
  return await changeProduto(id, data)
}