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

export interface ItemLocacao {
  id_item_locacao: number;
  id_locacao: number;
  id_peca: number;
}

export interface Locacao {
  id_locacao?: number;
  id_cliente: number;
  id_usuario: number;
  id_funcionario: number;
  data_locacao: string;
  data_evento: string;
  data_devolucao?: string | null;
  status: 'RESERVADA' | 'ENTREGUE' | 'DEVOLVIDA' | 'CANCELADA';
  item_locacao?: ItemLocacao[];
}

export interface StatusPeca {
  id_status: number;
  nome_status: string;
}

export interface PecaProdutoLogistica {
  id_peca: number;
  codigo_unico: string;
  descricao: string;
  tamanho: string;
  cor: string;
  material: string;
}

export interface RegistroLogistica {
  id_historico: number;
  id_peca: number;
  id_status: number;
  data_inicio: string;
  data_fim?: string | null;
  status_peca?: StatusPeca;
  peca_produto?: PecaProdutoLogistica;
}

export interface ClienteProcesso {
  id_cliente: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface FuncionarioProcesso {
  id_funcionario: number;
  nome: string;
}

export interface ItemLocacaoProcesso {
  id_item_locacao: number;
  id_peca: number;
  peca_produto: {
    id_peca: number;
    codigo_unico: string;
    descricao: string;
    tamanho: string;
  };
}

export interface LocacaoProcesso {
  id_locacao: number;
  id_cliente: number;
  id_funcionario: number;
  data_locacao: string;
  data_evento: string;
  data_devolucao?: string | null;
  status: 'RESERVADA' | 'ENTREGUE' | 'DEVOLVIDA' | 'CANCELADA';
  cliente: ClienteProcesso;
  funcionario: FuncionarioProcesso;
  item_locacao: ItemLocacaoProcesso[];
}

export interface ResponseKanban {
  reservadas: LocacaoProcesso[];
  entregues: LocacaoProcesso[];
  devolvidas: LocacaoProcesso[];
  canceladas: LocacaoProcesso[];
}