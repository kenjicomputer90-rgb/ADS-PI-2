import { PrismaClient, Prisma } from "@prisma/client";
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
  return newProduto
}
export async function removeProduto(id:number){
  const newProduto = await prisma.peca_produto.delete({
      where: {
    id_peca: id
      }
  })
}
export async function listProduto(){
  const newProduto = await prisma.peca_produto.findMany()
}
export async function precificaProduto(id:number){
  const newProduto = await prisma.peca_produto.delete
}
export async function porcentagem_venda(tipo:string){
  const newProduto = await prisma.peca_produto.delete
}
export async function returnProduto(id:number){
  const newProduto = await prisma.peca_produto.findUnique({
      where: {
    id_peca: id
      }
  })
}
export async function changeProduto(id:number, data:{ nome?:string, material?:string, descricao?:string, preco?:number, status?:string, tamanho?: number, cor?:string}){
  const filteredData = Object.fromEntries(
  Object.entries(data).filter(([_, value]) => value !== undefined)
);
  const updateProduto = await prisma.peca_produto.update({
    where: {
    id_peca: id
  },
  data: filteredData,
    include:{
        historico_peca: true
    }
})
}
export async function reservar(){
  const newProduto = await prisma.peca_produto.delete
}
export async function devolucao(){
  const newProduto = await prisma.peca_produto.delete
}
export async function venda(){
  const newProduto = await prisma.peca_produto.delete
}
export async function troca(){
  const newProduto = await prisma.peca_produto.delete
}