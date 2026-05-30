import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({
  adapter,
});

export async function addCliente(nome:string, cpf:string,telefone: string,
     endereco:string, rg?:string, data_nascimento?:Date)
{
  const newCliente = await prisma.cliente.create({
    data: {
        nome: nome,
        cpf: cpf,
        rg: rg ?? null,
        telefone: telefone,
        data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
        endereco: endereco,
    }
  })
}
export async function removeCliente(id:number){
return await prisma.cliente.delete({
    where: {
        id_cliente: id
    }
})
}
export async function changeCliente(id:number, nome?:string, cpf?:string, rg?:string, data_nascimento?:string){

}
export async function returnCliente(id:number){

}

export function getClientPedidos(){

}

export function getClientProdutos(){
    
}

export function consultaHistoricoLocacaoCliente(){

}
export function consultaPreferenciasCliente(){

}