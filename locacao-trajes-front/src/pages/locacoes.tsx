import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Locacao } from '../@types/ndex';
import { Plus, X, Calendar, CheckCircle, Ban, ArrowLeftRight, Truck, DollarSign} from 'lucide-react';

export function Locacoes() {

  // Novos estados para controle do Modal Financeiro de Pagamentos
const [isPagamentoModalOpen, setIsPagamentoModalOpen] = useState(false);
const [selectedLocacaoIdFinanceiro, setSelectedLocacaoIdFinanceiro] = useState<number | null>(null);
const [valorPagamento, setValorPagamento] = useState('');
const [formaPagamento, setFormaPagamento] = useState('Dinheiro');

const handleRegistrarPagamento = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedLocacaoIdFinanceiro || !valorPagamento) return;

  try {
    // Dispara a requisição POST para a rota do backend configurada
    await api.post('/financeiro/pagamentos', {
      id_locacao: selectedLocacaoIdFinanceiro,
      valor: Number(valorPagamento),
      forma_pagamento: formaPagamento
    });

    alert("Pagamento registrado e anexado à nota com sucesso!");
    setIsPagamentoModalOpen(false);
    setValorPagamento('');
    carregarLocacoes(); // Recarrega a lista para atualizar a visão
  } catch (error: any) {
    alert(error.response?.data?.erro || "Erro ao processar pagamento.");
  }
};
  const [locacoes, setLocacoes] = useState<Locacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados do Formulário de Nova Locação
  const [idCliente, setIdCliente] = useState('');
  const [idFuncionario, setIdFuncionario] = useState('');
  const [idPeca, setIdPeca] = useState('');
  const [dataEvento, setDataEvento] = useState('');

  // Estado para o modal secundário de troca de peça
  const [selectedLocacaoId, setSelectedLocacaoId] = useState<number | null>(null);
  const [novaPecaId, setNovaPecaId] = useState('');
  const [isTrocaModalOpen, setIsTrocaModalOpen] = useState(false);

  const carregarLocacoes = async () => {
    setLoading(true);
    try {
      // Como o seu roteador lida com o Kanban/Listas, simulamos a busca na rota base ou processos
      const response = await api.get('/processos/kanban');
      
      // Ajusta para ler a resposta estruturada ou uma lista simples
      if (Array.isArray(response.data)) {
        setLocacoes(response.data);
      } else if (response.data && typeof response.data === 'object') {
        // Se o back-end do kanban retornar agrupado por status { reservadas, entregues... }
        const jonas: Locacao[] = [
          ...(response.data.reservadas || []),
          ...(response.data.entregues || []),
          ...(response.data.devolvidas || []),
          ...(response.data.canceladas || [])
        ];
        setLocacoes(jonas);
      }
    } catch (error) {
      console.error("Erro ao carregar locações:", error);
      // Fallback para listagem caso a rota do Kanban não seja a principal global
      try {
        const resFallback = await api.get('/locacoes');
        if (Array.isArray(resFallback.data)) setLocacoes(resFallback.data);
      } catch { /* erro silencioso */ }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarLocacoes();
  }, []);

  // 1. Criar Locação
  async function handleCriarLocacao(e: React.FormEvent) {
    e.preventDefault();
    if (!idCliente || !idFuncionario || !idPeca || !dataEvento) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await api.post('/locacoes', {
        id_cliente: Number(idCliente),
        id_usuario: 1, // Fixado como admin do sistema por enquanto
        id_funcionario: Number(idFuncionario),
        id_peca: Number(idPeca),
        data_evento: dataEvento
      });

      setIdCliente(''); setIdFuncionario(''); setIdPeca(''); setDataEvento('');
      setIsModalOpen(false);
      carregarLocacoes();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro ao agendar locação.");
    }
  }

  // 2. Registrar Entrega (Peça sai com o cliente)
  async function handleRegistrarEntrega(id: number) {
    try {
      await api.post(`/locacoes/${id}/entrega`);
      carregarLocacoes();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro ao registrar entrega.");
    }
  }

  // 3. Registrar Devolução (Peça retorna para a loja)
  async function handleRegistrarDevolucao(id: number) {
    try {
      await api.post(`/locacoes/${id}/devolucao`);
      carregarLocacoes();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro ao registrar devolução.");
    }
  }

  // 4. Cancelar Locação
  async function handleCancelarLocacao(id: number) {
    if (!confirm("Tem certeza que deseja cancelar esta locação?")) return;
    try {
      await api.post(`/locacoes/${id}/cancelar`);
      carregarLocacoes();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro ao cancelar locação.");
    }
  }

  // 5. Executar Troca de Peça
  async function handleTrocarPeca(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedLocacaoId || !novaPecaId) return;

    try {
      await api.post(`/locacoes/${selectedLocacaoId}/troca`, {
        novaPecaId: Number(novaPecaId)
      });
      setNovaPecaId('');
      setIsTrocaModalOpen(false);
      carregarLocacoes();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro ao trocar a peça da locação.");
    }
  }
  return (
    
    <div className="p-8 bg-zinc-900 min-h-screen text-zinc-100">
      {/* HEADER */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="text-blue-500" /> Controle de Locações
          </h1>
          <p className="text-zinc-400 mt-1">Agendamentos, entregas e gerenciamento do ciclo de aluguel.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Nova Locação
        </button>
      </header>

      {/* TABELA DE REGISTROS */}
      {loading ? (
        <p className="text-zinc-400 animate-pulse">Carregando histórico de locações...</p>
      ) : (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800/50 text-zinc-300 font-semibold text-sm">
                <th className="p-4">Cód. Locação</th>
                <th className="p-4">ID Cliente</th>
                <th className="p-4">Data do Evento</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Ações de Fluxo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700 text-sm text-zinc-300">
              {locacoes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-zinc-500">Nenhuma locação encontrada no sistema.</td>
                </tr>
              ) : (
                locacoes.map((loc, index) => (
                  <tr key={loc.id_locacao ?? index} className="hover:bg-zinc-700/30 transition-colors">
                    <td className="p-4 font-mono text-zinc-400">#00{loc.id_locacao}</td>
                    <td className="p-4 font-medium text-white">{(loc as any).cliente?.nome || `Cliente #${loc.id_cliente}`}</td>
                    <td className="p-4">{new Date(loc.data_evento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        loc.status === 'RESERVADA' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        loc.status === 'ENTREGUE' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        loc.status === 'DEVOLVIDA' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {loc.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2 justify-center">
                      {loc.status === 'RESERVADA' && (
                        <>
                          <button onClick={() => handleRegistrarEntrega(loc.id_locacao!)} title="Registrar Saída/Entrega" className="bg-amber-600 hover:bg-amber-500 text-white p-1.5 rounded transition-colors flex items-center gap-1 text-xs"><Truck size={14}/> Retirada</button>
                          <button onClick={() => { setSelectedLocacaoId(loc.id_locacao!); setIsTrocaModalOpen(true); }} title="Trocar Peça do Traje" className="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 p-1.5 rounded transition-colors flex items-center gap-1 text-xs"><ArrowLeftRight size={14}/> Trocar Peça</button>
                          <button onClick={() => {setSelectedLocacaoIdFinanceiro(loc.id_locacao!); setIsPagamentoModalOpen(true);}}className="p-1.5 hover:bg-zinc-700 rounded text-zinc-400 hover:text-emerald-400 transition-colors" title="Lançar Pagamento / Nota"><DollarSign size={16} /></button>
                          <button onClick={() => handleCancelarLocacao(loc.id_locacao!)} title="Cancelar Reserva" className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white p-1.5 rounded transition-colors text-xs"><Ban size={14}/></button>
                        </>
                      )}
                      {loc.status === 'ENTREGUE' && (
                        <button onClick={() => handleRegistrarDevolucao(loc.id_locacao!)} title="Registrar Devolução à Loja" className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded transition-colors flex items-center gap-1 text-xs"><CheckCircle size={14}/> Devolução</button>
                      )}
                      {['DEVOLVIDA', 'CANCELADA'].includes(loc.status) && (
                        <span className="text-zinc-500 text-xs italic">Fluxo Encerrado</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL: NOVA LOCAÇÃO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200"><X size={20} /></button>
            <h2 className="text-xl font-bold text-white mb-4">Agendar Nova Locação</h2>
            <form onSubmit={handleCriarLocacao} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">ID do Cliente *</label>
                <input type="number" value={idCliente} onChange={(e) => setIdCliente(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="Ex: 1" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">ID do Funcionário Responsável *</label>
                <input type="number" value={idFuncionario} onChange={(e) => setIdFuncionario(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="Ex: 3" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">ID da Peça do Traje (Disponível) *</label>
                <input type="number" value={idPeca} onChange={(e) => setIdPeca(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="Ex: 14" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Data do Evento *</label>
                <input type="date" value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg font-medium">Cancelar</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">Reservar Traje</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TROCAR PEÇA */}
      {isTrocaModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl w-full max-w-sm p-6 relative shadow-2xl">
            <button onClick={() => setIsTrocaModalOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200"><X size={20} /></button>
            <h2 className="text-xl font-bold text-white mb-2">Substituir Peça</h2>
            <p className="text-xs text-zinc-400 mb-4">A nova peça precisa estar cadastrada com status 'Disponível'.</p>
            <form onSubmit={handleTrocarPeca} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">ID da Nova Peça *</label>
                <input type="number" value={novaPecaId} onChange={(e) => setNovaPecaId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="Ex: 18" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsTrocaModalOpen(false)} className="bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg font-medium">Cancelar</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">Confirmar Troca</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL DE REGISTRO DE PAGAMENTO / NOTA FINANCEIRA */}
{isPagamentoModalOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl w-full max-w-sm p-6 relative shadow-2xl">
      <button 
        onClick={() => setIsPagamentoModalOpen(false)} 
        className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200"
      >
        <X size={20} />
      </button>
      
      <h2 className="text-xl font-bold text-white mb-1">Baixar Pagamento</h2>
      <p className="text-xs text-zinc-400 mb-4">Insira o valor pago pelo cliente para abater do saldo da locação.</p>
      
      <form onSubmit={handleRegistrarPagamento} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Valor do Recebimento (R$)*</label>
          <input 
            type="number" 
            step="0.01" 
            required
            value={valorPagamento} 
            onChange={(e) => setValorPagamento(e.target.value)} 
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500" 
            placeholder="Ex: 150.00" 
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Forma de Pagamento</label>
          <select 
            value={formaPagamento} 
            onChange={(e) => setFormaPagamento(e.target.value)} 
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Pix">Pix</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button 
            type="button" 
            onClick={() => setIsPagamentoModalOpen(false)} 
            className="bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg text-sm hover:bg-zinc-600 transition-colors"
          >
            Voltar
          </button>
          <button 
            type="submit" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors shadow-lg"
          >
            Confirmar Recebimento
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}