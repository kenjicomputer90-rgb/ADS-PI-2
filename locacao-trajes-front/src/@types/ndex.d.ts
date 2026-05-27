export interface Cliente {
  id_cliente?: number;
  id_usuario?: number | null;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  rg?: string | null;
  medidas?: string | null;
  data_nascimento?: string | null;
}

export interface Produto {
  id_peca?: number;
  codigo_unico: string; // Mapeado como nome na criação
  descricao: string;
  tamanho: string;
  cor: string;
  material?: string | null;
  preco: number;
}