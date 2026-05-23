import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({
  adapter,
});

export async function addCliente(nome:string, cpf:string,telefone: string,
     endereco:string, rg?:string, data_nascimento?:string)
{
  const newCliente = await prisma.cliente.create({
    data: {
        nome: nome,
        cpf: cpf,
        rg: rg,
        telefone: telefone,
        data_nascimento: data_nascimento,
        endereco: endereco,
    }
  })
}
export function removeCliente(id:number){

}
export function changeCliente(id:number, nome?:string, cpf?:number, rg?:number, data_nacimento?:string){

}
export function returnCliente(id:number){

}

export function getClientPedidos(){

}

export function getClientProdutos(){
    
}

export function consultaHistoricoLocacaoCliente(){

}
export function consultaPreferenciasCliente(){

}