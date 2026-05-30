import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Cliente } from '../@types/ndex';
import { Plus, X } from 'lucide-react'; // Ícones para deixar a interface profissional

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para o formulário de novo cliente
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [rg, setRg] = useState('');

  // Função para buscar os clientes da API
  const carregarClientes = () => {
    setLoading(true);
    api.get('/cliente')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setClientes(response.data);
        } else {
          setClientes([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  // Função para lidar com o envio do formulário
  async function handleCriarCliente(e: React.FormEvent) {
    e.preventDefault();

    if (!nome || !cpf || !telefone || !endereco) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      // Bate exatamente na rota POST do back-end
      await api.post('/cliente', {
        nome,
        cpf,
        telefone,
        endereco,
        rg: rg || null
      });

      // Limpa os campos do formulário
      setNome('');
      setCpf('');
      setTelefone('');
      setEndereco('');
      setRg('');
      
      setIsModalOpen(false); // Fecha o modal
      carregarClientes();   // Atualiza a tabela automaticamente
    } catch (error: any) {
      console.error("Erro ao cadastrar cliente:", error);
      alert(error.response?.data?.erro || "Erro ao salvar cliente no banco de dados.");
    }
  }

  return (
    <div className="p-8 bg-zinc-900 min-h-screen text-zinc-100 relative">
      {/* HEADER */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-zinc-400 mt-1">Gerenciamento de clientes cadastrados no sistema.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Novo Cliente
        </button>
      </header>

      {/* TABELA DE LISTAGEM */}
      {loading ? (
        <p className="text-zinc-400 animate-pulse">Carregando clientes...</p>
      ) : (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800/50 text-zinc-300 font-semibold text-sm">
                <th className="p-4">Nome</th>
                <th className="p-4">CPF</th>
                <th className="p-4">Telefone</th>
                <th className="p-4">Endereço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700 text-sm text-zinc-300">
              {clientes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-zinc-500">Nenhum cliente cadastrado.</td>
                </tr>
              ) : (
                clientes.map((cliente) => (
                  <tr key={cliente.id_cliente} className="hover:bg-zinc-700/30 transition-colors">
                    <td className="p-4 font-medium text-white">{cliente.nome}</td>
                    <td className="p-4">{cliente.cpf}</td>
                    <td className="p-4">{cliente.telefone}</td>
                    <td className="p-4 max-w-xs truncate">{cliente.endereco}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL DE CADASTRO (Aparece apenas quando isModalOpen for true) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-white mb-4">Cadastrar Novo Cliente</h2>

            <form onSubmit={handleCriarCliente} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Nome *</label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Nome completo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">CPF *</label>
                  <input 
                    type="text" 
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">RG</label>
                  <input 
                    type="text" 
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="00.000.000-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Telefone *</label>
                <input 
                  type="text" 
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="(19) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Endereço *</label>
                <input 
                  type="text" 
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Rua, Número, Bairro"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}