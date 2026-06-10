import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./banco/dev.db"
});

const prisma = new PrismaClient({
  adapter,
});
export async function addFuncionario(
  id_usuario: number,
  nome: string,
  email: string,
  senha: string,
  cpf: string,
  rg: string,
  telefone: string,
  ctps: string,
  dependente: number,
  sexo: string,
  salario: number,
  data_nascimento: string,
  estado_civil: string
) {
  console.log("teste1")
  const usuario=await prisma.funcionario.findUnique({
    where:{ 
    id_usuario:id_usuario
    }
  })
  

  const funcionarioCpf = await prisma.funcionario.findUnique({
  where: {
    cpf
  }
})
if (usuario){
  return "usuario já sendo usado"
}
if(funcionarioCpf){
  return "cpf já sendo usado"
}


console.log("CPF encontrado:", funcionarioCpf)
   // console.log("teste2")
 //return "erro id_usuario já sendo usado"
  
  return await prisma.funcionario.create({
    data: {
      id_usuario,
      nome,
      cpf,
      rg,
      telefone,
      ctps,
      dependente,
      sexo,
      salario,
      data_nascimento: new Date(data_nascimento),
      estado_civil
    }
  })
}

export async function removeFuncionario(id: number) {
  return await prisma.funcionario.delete({
    where: {
      id_funcionario: id
    }
  })
}

export async function changeFuncionario(
  id: number,
  cpf?: string,
  rg?: string,
  telefone?: string,
  ctps?: string,
  dependente?: number,
  sexo?: string,
  salario?: number,
  data_nascimento?: string,
  estado_civil?: string
) {
  return await prisma.funcionario.update({
    where: { id_funcionario: id },
    data: {
      cpf,
      rg,
      telefone,
      ctps,
      dependente,
      sexo,
      salario,
      estado_civil,
      ...(data_nascimento && { data_nascimento: toISODate(data_nascimento) })
    }
  });
}

export async function returnFuncionario(id: number) {
  return await prisma.funcionario.findUnique({
    where: {
      id_funcionario: id
    }
  })
}