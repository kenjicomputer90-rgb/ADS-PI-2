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

export interface HistoricoPeca {
  id_historico: number;
  id_peca: number;
  id_status: number;
  data_inicio: string;
  data_fim?: string | null;
}

export interface Produto {
  id_peca?: number;
  codigo_unico: string; // O back-end recebe como 'nome'
  descricao: string;
  tamanho: string;
  cor: string;
  material: string;
  preco: number;
  historico_peca?: HistoricoPeca[];
}

export interface Funcionario {
  id_funcionario?: number;
  nome: string;
  cpf: number;
  cargo: string;
  rg: number;
  email: string;
  telefone: number;
  cpts: number;
  dependentes: number;
  sexo: string;
  salario: number;
  data_de_nascimento: string;
  estado_civil: string;
}