import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
 url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({
  adapter,
});


/*import { prisma } from "../database/prisma";

export async function criarCliente() {
 
}

//export const prisma = new PrismaClient();
export async function addProduto(nome:string, material:string, descricao:string, preco:number, status:"alugado"|"disponível"|"à venda"|"em manutenção", tamanho:number , cor:string, foto?:string){
    return await prisma.peca.create({
    data: {
      codigo_unico: "",
      descricao: "",
      tamanho: "",
      cor: ""
    },
  });
}
  */
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

}
export function removeProduto(id:number){}
export function listProduto(){}
export function precificaProduto(id:number){}
export function porcentagem_venda(tipo:string){
}
export function returnProduto(id:number){}
export function changeProduto(id:number, nome?:string, material?:string, descricao?:string, preco?:number, status?:string){}
export function reservar(){}
export function devolucao(){}
export function venda(){}
export function troca(){}