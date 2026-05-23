import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({
  adapter,
});

export function addFuncionario(nome:string, cpf:number, cargo:string, rg: number, email:string, telefone:number, cpts:number,dependentes:number,sexo: string,salario:number, data_de_nascimento:string, estado_civil:string){}
export function removeFuncionario(id:number){}
export function changeFuncionario(id:number,nome?:string, cpf?:number, rg?: number, email?:string,telefone?:number, cpts?:number,dependentes?:number,sexo?: string,salario?:number, data_de_nascimento?:string, estado_civil?:string){}
export function returnFuncionario(id:number){
    console.log (id)
    return id
}