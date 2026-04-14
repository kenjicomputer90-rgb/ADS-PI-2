// user.service.ts
export function addUser(nome: string): string {
  if (!nome) {
    throw new Error("Nome é obrigatório")
  }

  /*
  //teste de implementação do prisma
  import { prisma } from '../prisma'

export async function addUser(name: string) {
  const user = await prisma.user.create({
    data: { name }
  })

  return `Usuário ${user.name} adicionado`
}
  */


  return `Usuário ${nome} adicionado`
}