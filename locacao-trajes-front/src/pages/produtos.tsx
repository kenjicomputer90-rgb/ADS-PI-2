import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Produto } from '../@types/ndex';
import { Plus, X, Shirt } from 'lucide-react';

// Mapeamento dos status textuais para os IDs aceitos pelo seu back-end (1 a 4)
// Como você solicitou 6 status, agrupamos conforme a lógica do seu service
// IDs mapeados com status_peca do banco (somente status válidos para cadastro)
const STATUS_OPTIONS = [
  { id: 1, label: 'Disponível' },
  { id: 3, label: 'Em Manutenção' },
];

// Mapa completo para exibição na tabela
const STATUS_MAP: Record<number, { label: string; color: string }> = {
  1: { label: 'Disponível',     color: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  2: { label: 'Alugado',        color: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' },
  3: { label: 'Em Manutenção',  color: 'bg-red-500/10 text-red-400 border border-red-500/20' },
  4: { label: 'Vendido',        color: 'bg-zinc-600/30 text-zinc-400 border border-zinc-500/20' },
  5: { label: 'Reservado',      color: 'bg-purple-500/10 text-purple-400 border border-purple-500/20' },
  6: { label: 'Em Preparação',  color: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
};

export function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados do Formulário
  const [nome, setNome] = useState('');
  const [material, setMaterial] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [status, setStatus] = useState('1'); // Padrão: Disponível (ID 1)

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/produtos'); // Bate no seu produtosRouter.ts (GET /)
      if (Array.isArray(response.data)) {
        setProdutos(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function handleCriarProduto(e: React.FormEvent) {
    e.preventDefault();

    if (!nome || !material || !descricao || !preco || !tamanho || !cor) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Envia exatamente os parâmetros que o seu addProdutoController espera no req.body
      await api.post('/produtos', {
        nome,
        material,
        descricao,
        preco: Number(preco),
        status: Number(status), // Envia como 1, 2, 3 ou 4
        tamanho: Number(tamanho), // Seu service converte para String internamente
        cor
      });

      // Limpa os campos após o sucesso
      setNome('');
      setMaterial('');
      setDescricao('');
      setPreco('');
      setTamanho('');
      setCor('');
      setStatus('1');
      
      setIsModalOpen(false);
      carregarProdutos(); // Atualiza a tabela na hora
    } catch (error: any) {
      console.error("Erro ao cadastrar produto:", error);
      alert(error.response?.data?.erro || "Erro ao conectar com o servidor.");
    }
  }

  // Status atual = historico_peca[0] (back retorna só o registro com data_fim null)
  const getStatusAtual = (produto: Produto) => {
    const id = produto.historico_peca?.[0]?.id_status;
    return STATUS_MAP[id ?? 1] ?? STATUS_MAP[1];
  };

  return (
    <div className="p-8 bg-zinc-900 min-h-screen text-zinc-100">
      {/* HEADER */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shirt className="text-blue-500" /> Estoque de Trajes
          </h1>
          <p className="text-zinc-400 mt-1">Gerenciamento de peças, tamanhos e precificação.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Cadastrar Traje
        </button>
      </header>

      {/* LISTAGEM */}
      {loading ? (
        <p className="text-zinc-400 animate-pulse">Carregando inventário...</p>
      ) : (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800/50 text-zinc-300 font-semibold text-sm">
                <th className="p-4">Código / Nome</th>
                <th className="p-4">Descrição</th>
                <th className="p-4">Tam.</th>
                <th className="p-4">Cor</th>
                <th className="p-4">Material</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Status Atual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700 text-sm text-zinc-300">
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-zinc-500">Nenhum produto em estoque.</td>
                </tr>
              ) : (
                produtos.map((produto, index) => {
                  const statusAtual = getStatusAtual(produto);
                  const últimoStatus = produto.historico_peca?.[produto.historico_peca.length - 1]?.id_status;
                  return (
                    <tr key={produto.id_peca ?? index} className="hover:bg-zinc-700/30 transition-colors">
                      <td className="p-4 font-medium text-white">{produto.codigo_unico}</td>
                      <td className="p-4">{produto.descricao}</td>
                      <td className="p-4"><span className="bg-zinc-700 text-zinc-200 px-2 py-0.5 rounded text-xs">{produto.tamanho}</span></td>
                      <td className="p-4">{produto.cor}</td>
                      <td className="p-4">{produto.material}</td>
                      <td className="p-4 text-emerald-400 font-medium">R$ {Number(produto.preco).toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          últimoStatus === 4 ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          últimoStatus === 2 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          últimoStatus === 3 ? 'bg-zinc-600/30 text-zinc-400 border border-zinc-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {statusAtual.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL DE CADASTRO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-white mb-4">Cadastrar Novo Traje</h2>

            <form onSubmit={handleCriarProduto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Nome / Código Único *</label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Ex: Terno Slim Azul"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Descrição *</label>
                <input 
                  type="text" 
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Ex: Terno Oxford com corte italiano"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Tamanho (Número) *</label>
                  <input 
                    type="number" 
                    value={tamanho}
                    onChange={(e) => setTamanho(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ex: 48"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Cor *</label>
                  <input 
                    type="text" 
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ex: Azul Marinho"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Material *</label>
                  <input 
                    type="text" 
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ex: Algodão / Poliéster"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Preço (R$) *</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Status Inicial *</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  {STATUS_OPTIONS.map((opt, i) => (
                    <option key={i} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
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
                  Salvar Traje
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}