import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções utilitárias prontas para consumir suas rotas existentes
export const clienteService = {
  listar: () => api.get('/cliente'),
  criar: (dados: any) => api.post('/cliente', dados),
  deletar: (id: string | number) => api.delete(`/cliente/${id}`),
};

export const produtoService = {
  listar: () => api.get('/produtos'),
  criar: (dados: any) => api.post('/produtos', dados),
  deletar: (id: string | number) => api.delete(`/produto/${id}`),
};

export const funcionarioService = {
  listar: () => api.get('/funcionario'),
  criar: (dados: any) => api.post('/funcionario', dados),
};