import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({
  adapter,
});

export async function listClientes() {
  return await prisma.cliente.findMany({ orderBy: { nome: "asc" } });
}

export async function addCliente(nome:string, cpf:string,telefone: string,
     endereco:string, rg?:string, data_nascimento?:string)
{
  console.log(nome,cpf,rg,telefone,data_nascimento,endereco)
  const clienteExistente = await prisma.cliente.findUnique({
    where: {
      cpf,
    },
  })

  if (clienteExistente) {
    throw new Error("CPF já cadastrado")
  }
  
  // Prisma + SQLite (better-sqlite3) espera string "YYYY-MM-DD", nao objeto Date
  const dataNascFormatada = data_nascimento ? new Date(data_nascimento.split('T')[0] + 'T12:00:00.000Z').toISOString() : null;

  const newCliente = await prisma.cliente.create({
    data: {
        nome: nome,
        cpf: cpf,
        rg: rg ?? null,
        telefone: telefone,
        data_nascimento: dataNascFormatada,
        endereco: endereco,
    }
  })
  return newCliente
}

export async function removeCliente(id:number){
  const cliente = await prisma.cliente.findUnique({
    where: {
        id_cliente: id
    }
})
if (!cliente){
  throw new Error("Cliente não encontrado")
}
return await prisma.cliente.delete({
  where:{
    id_cliente: id
  }
})
}

export async function changeCliente(id: number, nome: string, cpf: string, telefone: string, 
  endereco: string, rg?: string, data_nascimento?: string ){
    const cliente = await prisma.cliente.findUnique({
      where: {
        id_cliente: id 
      }
    })
if (!cliente){
  throw new Error("Cliente não encontrado")
}
return await prisma.cliente.update({
  where: {
    id_cliente: id
  },
  data:{
    nome,
    cpf,
    telefone,
    endereco,
    rg: rg ? rg : null,
    data_nascimento: data_nascimento ? new Date(data_nascimento.split('T')[0] + 'T12:00:00.000Z').toISOString() : null
  }
})
}

export async function returnCliente(id:number){
  const cliente = await prisma.cliente.findUnique({
    where: {
      id_cliente: id 
    }
  })
  if (!cliente){
    throw new Error("Cliente não encontrado")
  }
  return cliente 

}

export async function getClientPedidos(
  idCliente: number
){
  return await prisma.locacao.findMany({
    where:{
      id_cliente: idCliente
    }
  })
}

export async function getClientProdutos(
  idCliente: number
) {
  return await prisma.peca_produto.findMany({
    where: {
      item_locacao: {
        some: {
          locacao: {
            id_cliente: idCliente
          }
        }
      }
    },
    include: {
      item_locacao: {
        include: {
          locacao: true
        }
      }
    }
  })
}

export async function consultaHistoricoLocacaoCliente(
  idCliente: number 
){
  return await prisma.locacao.findMany({
    where: {
      id_cliente: idCliente
    },
    include:{
      item_locacao:{
        include:{ peca_produto: true}
      },
      pagamento: true
    }
  })
}

export async function consultaPreferenciasCliente(
idCliente: number
){
return await prisma.item_locacao.groupBy({
  by:["id_peca"],
  where:{
    locacao:{
      id_cliente: idCliente
    }
  },
  _count:{
    id_peca: true
  },
  orderBy:{
    _count:{
      id_peca: "desc"
    }
  }
})
}