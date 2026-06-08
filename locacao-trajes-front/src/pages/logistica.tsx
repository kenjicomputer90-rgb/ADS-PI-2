import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Package, CheckSquare, AlertTriangle, RefreshCw, ClipboardCheck, ArrowUpRight, ArrowDownLeft, Wrench, RotateCcw } from 'lucide-react';

type PecaEstoque = {
  id_peca: number;
  codigo_unico: string;
  descricao: string;
  tamanho: string;
  cor: string;
  material: string;
  historico_peca: {
    id_historico: number;
    id_status: number;
    data_inicio: string;
    data_fim: string | null;
    status_peca?: { descricao: string };
  }[];
};

export function Logistica() {
  const [estoqueLogistica, setEstoqueLogistica] = useState<PecaEstoque[]>([]);
  const [loading, setLoading] = useState(true);

  const [isDevolucaoModalOpen, setIsDevolucaoModalOpen] = useState(false);
  const [selectedPecaId, setSelectedPecaId] = useState<number | null>(null);
  const [possuiAvaria, setPossuiAvaria] = useState(false);

  // Estados para modal de manutenção
  const [isManutencaoModalOpen, setIsManutencaoModalOpen] = useState(false);
  const [manutencaoPecaId, setManutencaoPecaId] = useState<number | null>(null);
  const [descricaoManutencao, setDescricaoManutencao] = useState('');

  const carregarDadosLogistica = async () => {
    setLoading(true);
    try {
      const response = await api.get('/logistica/estoque');
      if (Array.isArray(response.data)) {
        setEstoqueLogistica(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar estoque logístico:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarDadosLogistica(); }, []);

  async function handleSepararPeca(idPeca: number) {
    try {
      await api.post('/logistica/separacao', { id_peca: idPeca });
      carregarDadosLogistica();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro ao iniciar separação da peça.");
    }
  }

  async function handleConferirSaida(idPeca: number) {
    try {
      await api.post('/logistica/conferencia-saida', { id_peca: idPeca });
      carregarDadosLogistica();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro na conferência de saída.");
    }
  }

  async function handleConfirmarDevolucao(e: React.FormEvent) {
    e.preventDefault();
    if (selectedPecaId === null) return;
    try {
      await api.post('/logistica/conferencia-devolucao', {
        id_peca: selectedPecaId,
        possuiAvaria
      });
      setIsDevolucaoModalOpen(false);
      setSelectedPecaId(null);
      setPossuiAvaria(false);
      carregarDadosLogistica();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro ao processar devolução técnica.");
    }
  }

  // Enviar peça para manutenção com descrição
  async function handleEnviarManutencao(e: React.FormEvent) {
    e.preventDefault();
    if (manutencaoPecaId === null || !descricaoManutencao.trim()) return;
    try {
      await api.post(`/produtos/produtosManutencao/${manutencaoPecaId}`, {
        descricao: descricaoManutencao
      });
      setIsManutencaoModalOpen(false);
      setManutencaoPecaId(null);
      setDescricaoManutencao('');
      carregarDadosLogistica();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro ao enviar peça para manutenção.");
    }
  }

  // Voltar peça da manutenção para disponível
  async function handleVoltarManutencao(idPeca: number) {
    if (!confirm("Confirma que a manutenção foi concluída e a peça volta ao estoque?")) return;
    try {
      await api.delete(`/produtos/removeManutencao/${idPeca}`);
      carregarDadosLogistica();
    } catch (error: any) {
      alert(error.response?.data?.erro || "Erro ao retornar peça da manutenção.");
    }
  }

  return (
    <div className="p-8 bg-zinc-900 min-h-screen text-zinc-100 font-sans">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="text-blue-500" /> Operações Logísticas
          </h1>
          <p className="text-zinc-400 mt-1">Inspeção de qualidade, preparação de trajes e triagem de avarias.</p>
        </div>
        <button onClick={carregarDadosLogistica}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Atualizar Fluxo
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-800/40 border border-zinc-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg"><ArrowUpRight size={24}/></div>
          <div>
            <h3 className="text-sm font-medium text-zinc-400">Preparação e Saídas</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Peças reservadas aguardando separação e ajuste.</p>
          </div>
        </div>
        <div className="bg-zinc-800/40 border border-zinc-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg"><ArrowDownLeft size={24}/></div>
          <div>
            <h3 className="text-sm font-medium text-zinc-400">Retornos Técnicos</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Triagem de trajes retornando para conferência pós-evento.</p>
          </div>
        </div>
        <div className="bg-zinc-800/40 border border-zinc-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-red-500/10 text-red-400 rounded-lg"><Wrench size={24}/></div>
          <div>
            <h3 className="text-sm font-medium text-zinc-400">Manutenção</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Peças em reparo aguardando retorno ao estoque.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-400 animate-pulse">Consultando status físico das peças...</p>
      ) : (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800/50 text-zinc-300 font-semibold text-sm">
                <th className="p-4">ID Peça</th>
                <th className="p-4">Item / Traje</th>
                <th className="p-4">Detalhes</th>
                <th className="p-4">Status Físico</th>
                <th className="p-4 text-center">Controle Operacional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700 text-sm text-zinc-300">
              {estoqueLogistica.length === 0 ? (
                <tr><td colSpan={5} className="p-4 text-center text-zinc-500">Nenhuma peça no estoque.</td></tr>
              ) : (
                estoqueLogistica.map((item, index) => {
                  const idStatus = item.historico_peca?.[0]?.id_status ?? 0;
                  return (
                    <tr key={item.id_peca ?? index} className="hover:bg-zinc-700/30 transition-colors">
                      <td className="p-4 font-mono text-zinc-500">#PECA-{item.id_peca}</td>
                      <td className="p-4">
                        <div className="font-medium text-white">{item.codigo_unico || "Peça Cadastrada"}</div>
                        <div className="text-xs text-zinc-400 mt-0.5">{item.descricao}</div>
                      </td>
                      <td className="p-4 text-xs space-y-0.5">
                        <div><span className="text-zinc-500">Tam:</span> {item.tamanho} | <span className="text-zinc-500">Cor:</span> {item.cor}</div>
                        <div><span className="text-zinc-500">Mat:</span> {item.material}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          idStatus === 1 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          idStatus === 2 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          idStatus === 3 ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          idStatus === 4 ? 'bg-zinc-600/30 text-zinc-400 border border-zinc-500/20' :
                          idStatus === 5 ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {idStatus === 1 && "Disponível"}
                          {idStatus === 2 && "Alugado"}
                          {idStatus === 3 && "Em Manutenção"}
                          {idStatus === 4 && "Vendido"}
                          {idStatus === 5 && "Reservado"}
                          {idStatus === 6 && "Em Preparação"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center flex-wrap">
                          {idStatus === 5 && (
                            <button onClick={() => handleSepararPeca(item.id_peca)}
                              className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5">
                              <ClipboardCheck size={14}/> Iniciar Separação
                            </button>
                          )}
                          {idStatus === 6 && (
                            <button onClick={() => handleConferirSaida(item.id_peca)}
                              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5">
                              <CheckSquare size={14}/> Conferir Saída
                            </button>
                          )}
                          {idStatus === 2 && (
                            <button onClick={() => { setSelectedPecaId(item.id_peca); setIsDevolucaoModalOpen(true); }}
                              className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5">
                              <AlertTriangle size={14} className="text-amber-400"/> Triagem Retorno
                            </button>
                          )}
                          {/* Botão manutenção: disponível para peças disponíveis ou em preparação */}
                          {(idStatus === 1 || idStatus === 6) && (
                            <button onClick={() => { setManutencaoPecaId(item.id_peca); setIsManutencaoModalOpen(true); }}
                              className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5">
                              <Wrench size={14}/> Manutenção
                            </button>
                          )}
                          {/* Botão voltar da manutenção */}
                          {idStatus === 3 && (
                            <button onClick={() => handleVoltarManutencao(item.id_peca)}
                              className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5">
                              <RotateCcw size={14}/> Concluir Reparo
                            </button>
                          )}
                          {![1, 2, 3, 5, 6].includes(idStatus) && (
                            <span className="text-zinc-500 text-xs italic">Aguardando novos ciclos</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL: TRIAGEM DE DEVOLUÇÃO */}
      {isDevolucaoModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <ClipboardCheck className="text-blue-500" /> Inspeção de Devolução
            </h2>
            <p className="text-xs text-zinc-400 mb-6">Avalie as condições físicas do traje antes de retorná-lo ao estoque.</p>
            <form onSubmit={handleConfirmarDevolucao} className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input type="checkbox" checked={possuiAvaria} onChange={(e) => setPossuiAvaria(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-blue-600 bg-zinc-700 border-zinc-600" />
                  <div>
                    <span className="text-sm font-semibold text-white block">O traje possui avarias?</span>
                    <span className="text-xs text-zinc-400 mt-0.5 block">Marque caso necessite de costura, lavagem especial ou reparo.</span>
                  </div>
                </label>
              </div>
              <div className={`p-3 rounded-lg border text-xs ${possuiAvaria ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                {possuiAvaria ? "⚠️ A peça será enviada para 'Em Manutenção'." : "✅ O traje voltará para 'Disponível'."}
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => { setIsDevolucaoModalOpen(false); setSelectedPecaId(null); }}
                  className="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors">Cancelar</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">Finalizar Conferência</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ENVIAR PARA MANUTENÇÃO */}
      {isManutencaoModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <Wrench className="text-red-400" /> Registrar Manutenção
            </h2>
            <p className="text-xs text-zinc-400 mb-4">Descreva o problema. A peça será marcada como "Em Manutenção".</p>
            <form onSubmit={handleEnviarManutencao} className="space-y-4">
              <textarea
                value={descricaoManutencao}
                onChange={(e) => setDescricaoManutencao(e.target.value)}
                placeholder="Ex: Zíper quebrado, botão faltando, mancha difícil..."
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500 transition-colors resize-none"
                required
              />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => { setIsManutencaoModalOpen(false); setDescricaoManutencao(''); }}
                  className="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors">Cancelar</button>
                <button type="submit"
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
                  <Wrench size={14}/> Confirmar Manutenção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}