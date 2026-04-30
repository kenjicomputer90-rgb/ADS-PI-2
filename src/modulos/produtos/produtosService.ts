export function addProduto(nome:string, material:string, descricao:string, preco:number, status:"alugado"|"disponível"|"à venda"|"em manutenção", tamanho:number , cor:string, foto?:string){}
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