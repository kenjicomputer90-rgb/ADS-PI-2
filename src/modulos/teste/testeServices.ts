// user.service.ts
export function addUser(nome: string): string {
  if (!nome) {
    throw new Error("Nome é obrigatório")
  }

  return `Usuário ${nome} adicionado`
}