import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { ResponseKanban, LocacaoProcesso } from '../@types/ndex';
import { Layers, AlertTriangle, Bell, Clock, RefreshCw, User, ShieldAlert } from 'lucide-react';

export function Processos() {
  const [activeTab, setActiveTab] = useState<'kanban' | 'atrasos'>('kanban');
  const [kanbanData, setKanbanData] = useState<ResponseKanban | null>(null);
  const [atrasos, setAtrasos] = useState<LocacaoProcesso[]>([]);
  const [loading, setLoading] = useState(true);
  const [alerting, setAlerting] = useState(false);

  const carregarDadosProcessos = async () => {
    setLoading(true);
    try {
      if (activeTab === 'kanban') {
        const response = await api.get('/processos/kanban');
        setKanbanData(response.data);
      } else {
        const response = await api.get('/processos/atrasos');
        setAtrasos(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do módulo de processos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDadosProcessos();
  }, [activeTab]);

  // Executa o disparo em lote de Alertas de Atraso (POST /processos/alerta-atraso)
  async function handleDispararAlertas() {
    setAlerting(true);
    try {
      const response = await api.post('/processos/alerta-atraso');
      alert(`Simulação Concluída!\n\n${response.data.mensagem || "Alertas de cobrança enviados com sucesso para os clientes com pendências."}`);
      carregarDadosProcessos();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro ao processar rotina de alertas.");
    } finally {
      setAlerting(false);
    }
  }

  return (
    <div className="p-8 bg-zinc-900 min-h-screen text-zinc-100 font-sans">
      {/* HEADER */}
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Layers className="text-blue-500" /> Processos & Fluxos
          </h1>
          <p className="text-zinc-400 mt-1">Supervisão de fluxo Kanban, auditoria de devoluções e alertas automáticos.</p>
        </div>
        
        {/* ABAS DE SELECÇÃO DE VISÃO */}
        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 self-stretch sm:self-auto">
          <button 
            onClick={() => setActiveTab('kanban')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'kanban' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers size={16} /> Quadro Kanban
          </button>
          <button 
            onClick={() => setActiveTab('atrasos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
              activeTab === 'atrasos' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Clock size={16} /> Atrasos Pendentes
          </button>
        </div>
      </header>

      {/* RENDERIZAÇÃO DA ABA: QUADRO KANBAN */}
      {activeTab === 'kanban' && (
        <>
          {loading ? (
            <p className="text-zinc-400 animate-pulse flex items-center gap-2"><RefreshCw className="animate-spin"/> Mapeando colunas do Kanban...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
              
              {/* COLUNA 1: RESERVADAS */}
              <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                  <h3 className="font-semibold text-zinc-300 flex items-center gap-2 text-sm uppercase tracking-wider">🟢 Reservadas</h3>
                  <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs text-zinc-400 font-mono font-bold">{kanbanData?.reservadas?.length || 0}</span>
                </div>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {kanbanData?.reservadas.map(loc => <CardKanban key={loc.id_locacao} locacao={loc} />)}
                  {kanbanData?.reservadas.length === 0 && <p className="text-xs text-zinc-600 text-center py-4">Sem reservas ativas.</p>}
                </div>
              </div>

              {/* COLUNA 2: ENTREGUES */}
              <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                  <h3 className="font-semibold text-zinc-300 flex items-center gap-2 text-sm uppercase tracking-wider">🔵 Com Cliente</h3>
                  <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs text-zinc-400 font-mono font-bold">{kanbanData?.entregues?.length || 0}</span>
                </div>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {kanbanData?.entregues.map(loc => <CardKanban key={loc.id_locacao} locacao={loc} />)}
                  {kanbanData?.entregues.length === 0 && <p className="text-xs text-zinc-600 text-center py-4">Nenhum traje em trânsito com cliente.</p>}
                </div>
              </div>

              {/* COLUNA 3: DEVOLVIDAS */}
              <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                  <h3 className="font-semibold text-zinc-300 flex items-center gap-2 text-sm uppercase tracking-wider">🟣 Finalizadas</h3>
                  <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs text-zinc-400 font-mono font-bold">{kanbanData?.devolvidas?.length || 0}</span>
                </div>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {kanbanData?.devolvidas.map(loc => <CardKanban key={loc.id_locacao} locacao={loc} />)}
                  {kanbanData?.devolvidas.length === 0 && <p className="text-xs text-zinc-600 text-center py-4">Histórico vazio para este ciclo.</p>}
                </div>
              </div>

              {/* COLUNA 4: CANCELADAS */}
              <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                  <h3 className="font-semibold text-zinc-300 flex items-center gap-2 text-sm uppercase tracking-wider">🔴 Canceladas</h3>
                  <span className="bg-zinc-800 px-2 py-0.5 rounded text-xs text-zinc-400 font-mono font-bold">{kanbanData?.canceladas?.length || 0}</span>
                </div>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {kanbanData?.canceladas.map(loc => <CardKanban key={loc.id_locacao} locacao={loc} />)}
                  {kanbanData?.canceladas.length === 0 && <p className="text-xs text-zinc-600 text-center py-4">Nenhum cancelamento registado.</p>}
                </div>
              </div>

            </div>
          )}
        </>
      )}

      {/* RENDERIZAÇÃO DA ABA: DEVOLUÇÕES EM ATRASO */}
      {activeTab === 'atrasos' && (
        <div className="space-y-6">
          <div className="bg-zinc-800/40 border border-zinc-800 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-3 items-center">
              <div className="p-3 bg-red-500/10 text-red-400 rounded-lg"><ShieldAlert size={24}/></div>
              <div>
                <h2 className="text-lg font-bold text-white">Central de Alertas Críticos</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Identificação automática de peças cujo prazo estipulado expirou sem registo de devolução de logística.</p>
              </div>
            </div>
            <button 
              onClick={handleDispararAlertas}
              disabled={alerting || atrasos.length === 0}
              className="bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 text-white disabled:text-zinc-500 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 self-stretch md:self-auto justify-center shadow-lg"
            >
              <Bell size={16} />
              {alerting ? "Processando disparos..." : "Disparar Alertas de Cobrança"}
            </button>
          </div>

          {loading ? (
            <p className="text-zinc-400 animate-pulse flex items-center gap-2"><RefreshCw className="animate-spin"/> Compilando devoluções pendentes...</p>
          ) : (
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-700 bg-zinc-800/50 text-zinc-300 font-semibold text-sm">
                    <th className="p-4">Cód. Aluguer</th>
                    <th className="p-4">Cliente / Contacto</th>
                    <th className="p-4">Peça Alugada</th>
                    <th className="p-4">Data Limite Limiar</th>
                    <th className="p-4 text-center">Status Interno</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-700 text-sm text-zinc-300">
                  {atrasos.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-zinc-500 font-medium">🎉 Excelente! Não existem locações em atraso no sistema neste momento.</td>
                    </tr>
                  ) : (
                    atrasos.map(item => (
                      <tr key={item.id_locacao} className="hover:bg-red-500/[0.02] transition-colors border-l-2 border-l-red-500">
                        <td className="p-4 font-mono text-zinc-400">#00{item.id_locacao}</td>
                        <td className="p-4">
                          <div className="font-semibold text-white">{item.cliente?.nome}</div>
                          <div className="text-xs text-zinc-400 font-mono mt-0.5">{item.cliente?.telefone}</div>
                        </td>
                        <td className="p-4">
                          {item.item_locacao?.map(p => (
                            <div key={p.id_item_locacao} className="text-xs text-zinc-300">
                              <span className="text-zinc-500">[{p.peca_produto?.codigo_unico}]</span> {p.peca_produto?.descricao} (Tam: {p.peca_produto?.tamanho})
                            </div>
                          ))}
                        </td>
                        <td className="p-4 text-red-400 font-semibold">
                          {new Date(item.data_evento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                        </td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold font-mono">
                            EM ATRASO
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// SUB-COMPONENTE: CARD ISOLADO DO KANBAN
function CardKanban({ locacao }: { locacao: LocacaoProcesso }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl hover:border-zinc-700 transition-all shadow space-y-3">
      <div className="flex justify-between items-start">
        <span className="text-[11px] font-mono font-bold text-zinc-500">#00{locacao.id_locacao}</span>
        <span className="text-[11px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
          <User size={10}/> Atendente: {locacao.funcionario?.nome}
        </span>
      </div>
      
      <div>
        <h4 className="text-sm font-bold text-white tracking-tight">{locacao.cliente?.nome}</h4>
        <p className="text-xs text-zinc-400 font-mono mt-0.5">{locacao.cliente?.telefone}</p>
      </div>

      <div className="border-t border-zinc-800/80 pt-2 space-y-1">
        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Itens Vinculados:</span>
        {locacao.item_locacao?.map(item => (
          <div key={item.id_item_locacao} className="text-xs text-zinc-300 font-medium truncate">
            🧥 {item.peca_produto?.descricao} <span className="text-zinc-500 font-mono">({item.peca_produto?.tamanho})</span>
          </div>
        ))}
      </div>

      <div className="bg-zinc-950 p-2 rounded-lg flex justify-between items-center text-[11px] border border-zinc-800/60">
        <span className="text-zinc-500 font-semibold uppercase">Uso/Evento:</span>
        <span className="text-blue-400 font-bold font-mono">{new Date(locacao.data_evento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
      </div>
    </div>
  );
}