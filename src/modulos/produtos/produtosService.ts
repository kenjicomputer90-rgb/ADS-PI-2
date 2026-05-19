<<<<<<< HEAD
import { prisma } from "../database/prisma";
=======
/*import { prisma } from "../database/prisma";
>>>>>>> 29e62652a3c98e3b6f039a807e476c77459cd763

export async function criarCliente() {
 
}

//export const prisma = new PrismaClient();
export async function addProduto(nome:string, material:string, descricao:string, preco:number, status:"alugado"|"disponível"|"à venda"|"em manutenção", tamanho:number , cor:string, foto?:string){
    return await prisma.cliente.create({
    data: {
      nome: "Eduardo",
      cpf: "123",
    },
  });
}
<<<<<<< HEAD
=======
  */
 export async function addProduto(nome:string, material:string, descricao:string, preco:number, status:"alugado"|"disponível"|"à venda"|"em manutenção", tamanho:number , cor:string, foto?:string){
   
}
>>>>>>> 29e62652a3c98e3b6f039a807e476c77459cd763
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