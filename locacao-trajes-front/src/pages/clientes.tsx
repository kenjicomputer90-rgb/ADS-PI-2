import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Cliente, HistoricoLocacaoCliente, PreferenciaCliente } from '../@types/ndex';
import { Users, UserPlus, Trash2, Edit2, Search, X, Calendar, ShoppingBag, PieChart, MapPin, FileText } from 'lucide-react';

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Estados do Formulário (Modal Novo/Editar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  // Estados do Painel Analítico Lateral (Perfil/CRM)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [historico, setHistorico] = useState<HistoricoLocacaoCliente[]>([]);
  const [preferencias, setPreferencias] = useState<PreferenciaCliente[]>([]);
  const [loadingCRM, setLoadingCRM] = useState(false);

  const carregarClientes = async () => {
  setLoading(true);
  try {
    const response = await api.get('/clientes'); // ou a sua rota de listagem/busca correspondente
    
    // Certifique-se de que o response.data é realmente o array esperado
    if (Array.isArray(response.data)) {
      setClientes(response.data);
    }
  } catch (error) {
    console.error("Erro ao listar:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    carregarClientes();
  }, []);

  // Abre o painel lateral e carrega o histórico e preferências reais do back-end
  async function handleAbrirCRM(cliente: Cliente) {
    setSelectedCliente(cliente);
    setLoadingCRM(true);
    try {
      const [resHist, resPref] = await Promise.all([
        api.get(`/clientes/${cliente.id_cliente}/historico`),
        api.get(`/clientes/${cliente.id_cliente}/preferencias`)
      ]);
      setHistorico(resHist.data);
      setPreferencias(resPref.data);
    } catch (error) {
      console.error("Erro ao buscar inteligência do cliente:", error);
    } finally {
      setLoadingCRM(false);
    }
  }

async function handleSalvarCliente(e: React.FormEvent) {
  e.preventDefault();
  
  const rgTratado = rg.trim() === "" ? undefined : rg.trim();
  const dataNascimentoTratada = dataNascimento ? `${dataNascimento}T12:00:00` : undefined;

  const payload = { 
    nome: nome.trim(), 
    cpf: cpf.replace(/\D/g, ''), 
    telefone: telefone.trim(), 
    endereco: endereco.trim(), 
    rg: rgTratado, 
    data_nascimento: dataNascimentoTratada 
  };

  try {
    if (editingId) {
      // Garante ID na URL para o PATCH
      await api.patch(`/clientes/${editingId}`, payload); 
    } else {
      await api.post('/clientes', payload);
    }
    fecharModal();
    carregarClientes();
  } catch (error: any) {
    alert(`Erro: ${error.response?.data?.erro || "Erro ao salvar"}`);
  }
}
  // Preenche dados para edição
  function handleEditarCliente(cliente: Cliente) {
    setEditingId(cliente.id_cliente);
    setNome(cliente.nome);
    setCpf(cliente.cpf);
    setRg(cliente.rg || '');
    setTelefone(cliente.telefone);
    setEndereco(cliente.endereco);
    if (cliente.data_nascimento) {
      setDataNascimento(new Date(cliente.data_nascimento).toISOString().split('T')[0]);
    } else {
      setDataNascimento('');
    }
    setIsModalOpen(true);
  }

  async function handleDeletarCliente(id_cliente: number) {
  if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
  
  try {
    // CORREÇÃO: Enviando o ID na URL conforme o clienteRouter.ts espera
    await api.delete(`/clientes/${id_cliente}`); 
    carregarClientes();
  } catch (error: any) {
    alert(`Erro ao excluir: ${error.response?.data?.erro || "Erro interno"}`);
  }
}

// 3. FUNÇÃO DO CRM (HISTÓRICO)
const abrirCRM = async (cliente: Cliente) => {
  setSelectedCliente(cliente);
  setLoadingCRM(true);
  try {
    // Garante o uso de id_cliente
    const [historicoRes, prefRes] = await Promise.all([
      api.get(`/clientes/${cliente.id_cliente}/historico`),
      api.get(`/clientes/${cliente.id_cliente}/preferencias`)
    ]);
    setHistorico(historicoRes.data);
    setPreferencias(prefRes.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingCRM(false);
  }
};

  function fecharModal() {
  setIsModalOpen(false);
  setEditingId(null);
  setNome('');
  setCpf('');
  setRg('');
  setTelefone('');
  setEndereco('');
  setDataNascimento('');
}

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.cpf.includes(search)
  );

  return (
    <div className="p-8 bg-zinc-900 min-h-screen text-zinc-100 font-sans relative overflow-x-hidden">
      {/* HEADER */}
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="text-blue-500" /> Gestão de Clientes
          </h1>
          <p className="text-zinc-400 mt-1">Cadastro de fichas, consulta de preferências e histórico de locações.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg"
        >
          <UserPlus size={18} /> Novo Cliente
        </button>
      </header>

      {/* FILTRO DE PESQUISA */}
      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          type="text" 
          placeholder="Pesquisar por nome ou CPF..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
        />
      </div>

      {/* CONTEÚDO PRINCIPAL (LAYOUT DIVIDIDO SE CRM ABERTO) */}
      <div className="flex gap-6 items-start transition-all">
        <div className={`flex-1 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl ${selectedCliente ? 'max-w-[55%]' : 'w-full'}`}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800/50 text-zinc-300 font-semibold text-sm">
                <th className="p-4">Nome Cliente</th>
                <th className="p-4">Contato / CPF</th>
                {!selectedCliente && <th className="p-4">Endereço</th>}
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700 text-sm text-zinc-300">
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-zinc-500 animate-pulse">Buscando base de clientes do TrajeLoc...</td></tr>
              ) : clientesFiltrados.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-zinc-500">Nenhum cliente cadastrado ou localizado.</td></tr>
              ) : (
                clientesFiltrados.map(cliente => (
                  <tr 
                    key={cliente.id_cliente} 
                    onClick={() => handleAbrirCRM(cliente)}
                    className={`cursor-pointer transition-colors ${selectedCliente?.id_cliente === cliente.id_cliente ? 'bg-blue-600/10 hover:bg-blue-600/10' : 'hover:bg-zinc-700/40'}`}
                  >
                    <td className="p-4">
                      <div className="font-semibold text-white">{cliente.nome}</div>
                      <div className="text-xs text-zinc-400 font-mono mt-0.5">ID: #{cliente.id_cliente}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-zinc-200">{cliente.telefone}</div>
                      <div className="text-xs text-zinc-500 font-mono mt-0.5">{cliente.cpf}</div>
                    </td>
                    {!selectedCliente && (
                      <td className="p-4 text-zinc-400 truncate max-w-xs">{cliente.endereco}</td>
                    )}
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1 justify-center">
                        <button 
                          onClick={() => handleEditarCliente(cliente)}
                          className="p-2 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
                          title="Editar Cadastro"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button 
                          onClick={() => handleDeletarCliente(cliente.id_cliente)}
                          className="p-2 hover:bg-zinc-700 text-zinc-400 hover:text-red-400 rounded-lg transition-colors"
                          title="Excluir Cadastro"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 📑 DRAWER/PAINEL LATERAL: INTELIGÊNCIA DO CLIENTE (CRM) */}
        {selectedCliente && (
          <div className="w-[43%] bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl relative space-y-6 animate-in slide-in-from-right duration-200">
            <button 
              onClick={() => setSelectedCliente(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 p-1.5 hover:bg-zinc-900 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>

            {/* Cabeçalho do Perfil */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500">Perfil Analítico</span>
              <h2 className="text-xl font-bold text-white mt-1">{selectedCliente.nome}</h2>
              <div className="mt-2 text-xs text-zinc-400 space-y-1">
                <p className="flex items-center gap-1.5"><MapPin size={13} className="text-zinc-600"/> {selectedCliente.endereco}</p>
                {selectedCliente.rg && <p className="flex items-center gap-1.5"><FileText size={13} className="text-zinc-600"/> RG: {selectedCliente.rg}</p>}
                {selectedCliente.data_nascimento && (
                  <p className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-zinc-600"/> Nasc: {new Date(selectedCliente.data_nascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </p>
                )}
              </div>
            </div>

            <hr className="border-zinc-800" />

            {/* Seção de Preferências de Trajes */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1.5 mb-3">
                <PieChart size={14} className="text-purple-400" /> Preferências (Peças mais Locadas)
              </h3>
              {loadingCRM ? (
                <div className="h-6 w-24 bg-zinc-900 animate-pulse rounded"></div>
              ) : preferencias.length === 0 ? (
                <p className="text-xs italic text-zinc-600">Sem dados estatísticos de trajes alugados.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {preferencias.map((pref, i) => (
                    <span key={i} className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded-lg text-xs font-medium font-mono">
                      Peça #{pref.id_peca} ({pref._count.id_peca}x)
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Seção de Histórico de Locações */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1.5">
                <ShoppingBag size={14} className="text-emerald-400" /> Linha do Tempo de Alugueres
              </h3>
              
              {loadingCRM ? (
                <p className="text-xs text-zinc-600 animate-pulse">Compilando histórico...</p>
              ) : historico.length === 0 ? (
                <p className="text-xs italic text-zinc-600">Este cliente ainda não realizou nenhuma locação.</p>
              ) : (
                <div className="space-y-3 max-h-[38vh] overflow-y-auto pr-1">
                  {historico.map(loc => (
                    <div key={loc.id_locacao} className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-zinc-500">CONTRATO #00{loc.id_locacao}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          loc.status === 'DEVOLVIDA' ? 'bg-emerald-500/10 text-emerald-400' :
                          loc.status === 'CANCELADA' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {loc.status}
                        </span>
                      </div>
                      <div className="text-zinc-400">
                        {loc.item_locacao.map(i => `${i.peca_produto.descricao} (${i.peca_produto.tamanho})`).join(', ')}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono flex justify-between pt-1 border-t border-zinc-800/50">
                        <span>Retirada: {new Date(loc.data_locacao).toLocaleDateString('pt-BR')}</span>
                        {loc.pagamento && loc.pagamento[0] && (
                          <span className="text-emerald-500 font-bold">R$ {loc.pagamento[0].valor_total.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 📝 MODAL: CADASTRAR OU EDITAR CLIENTE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl w-full max-w-xl p-6 relative shadow-2xl">
            <button onClick={fecharModal} className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg">
              <X size={18} />
            </button>
            
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
              <UserPlus className="text-blue-500" /> {editingId ? "Atualizar Ficha do Cliente" : "Cadastrar Novo Cliente"}
            </h2>
            <p className="text-xs text-zinc-400 mb-6">Insira os dados cadastrais obrigatórios. O CPF deve ser único.</p>

            <form onSubmit={handleSalvarCliente} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Nome Completo *</label>
                  <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">CPF (Apenas números) *</label>
                  <input type="text" required value={cpf} onChange={(e) => setCpf(e.target.value)} disabled={!!editingId} className="w-full bg-zinc-950 border border-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">RG (Opcional)</label>
                  <input type="text" value={rg} onChange={(e) => setRg(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Telefone Celular *</label>
                  <input type="text" required value={telefone} onChange={(e) => setTelefone(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Data de Nascimento</label>
                  <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Endereço Residencial Completo *</label>
                  <input type="text" required value={endereco} onChange={(e) => setEndereco(e.target.value)} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-700 mt-6">
                <button type="button" onClick={fecharModal} className="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors">Cancelar</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors shadow-lg">
                  {editingId ? "Salvar Alterações" : "Efetivar Cadastro"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}