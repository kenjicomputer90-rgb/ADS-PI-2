import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Funcionario } from '../@types/ndex';
import { Plus, X, Briefcase } from 'lucide-react';

export function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados do Formulário (alinhados com o req.body do seu controller)
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');
  const [rg, setRg] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpts, setCpts] = useState('');
  const [dependentes, setDependentes] = useState('0');
  const [sexo, setSexo] = useState('M');
  const [salario, setSalario] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('Solteiro(a)');

  const carregarFuncionarios = async () => {
    setLoading(true);
    try {
      // Bate no seu funcionarioRouter.ts (GET /)
      const response = await api.get('/funcionarios'); 
      if (Array.isArray(response.data)) {
        setFuncionarios(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  async function handleCriarFuncionario(e: React.FormEvent) {
    e.preventDefault();

    if (!nome || !cpf || !cargo || !rg || !email || !telefone || !salario || !dataNascimento) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      // Envia os dados convertendo strings numéricas para number conforme o service espera
      await api.post('/funcionarios', {
        nome,
        cpf: Number(cpf),
        cargo,
        rg: Number(rg),
        email,
        telefone: Number(telefone),
        cpts: Number(cpts || 0),
        dependentes: Number(dependentes),
        sexo,
        salario: Number(salario),
        data_de_nascimento: dataNascimento,
        estado_civil: estadoCivil
      });

      // Limpa os campos após o sucesso
      setNome(''); setCpf(''); setCargo(''); setRg(''); setEmail('');
      setTelefone(''); setCpts(''); setDependentes('0'); setSexo('M');
      setSalario(''); setDataNascimento(''); setEstadoCivil('Solteiro(a)');
      
      setIsModalOpen(false);
      carregarFuncionarios(); // Atualiza a tabela na hora
    } catch (error: any) {
      console.error("Erro ao cadastrar funcionário:", error);
      alert(error.response?.data?.erro || "Erro ao conectar com o servidor do back-end.");
    }
  }

  return (
    <div className="p-8 bg-zinc-900 min-h-screen text-zinc-100">
      {/* HEADER */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="text-blue-500" /> Equipe de Funcionários
          </h1>
          <p className="text-zinc-400 mt-1">Gerenciamento de vendedores, cargos e folhas internos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Cadastrar Funcionário
        </button>
      </header>

      {/* LISTAGEM */}
      {loading ? (
        <p className="text-zinc-400 animate-pulse">Carregando membros da equipe...</p>
      ) : (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800/50 text-zinc-300 font-semibold text-sm">
                <th className="p-4">Nome</th>
                <th className="p-4">Cargo</th>
                <th className="p-4">Telefone</th>
                <th className="p-4">E-mail</th>
                <th className="p-4">Salário</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700 text-sm text-zinc-300">
              {funcionarios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-zinc-500">Nenhum funcionário contratado.</td>
                </tr>
              ) : (
                funcionarios.map((func, index) => (
                  <tr key={func.id_funcionario ?? index} className="hover:bg-zinc-700/30 transition-colors">
                    <td className="p-4 font-medium text-white">{func.nome}</td>
                    <td className="p-4">
                      <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-xs font-medium">
                        {func.cargo}
                      </span>
                    </td>
                    <td className="p-4">{func.telefone}</td>
                    <td className="p-4 text-zinc-400">{func.email}</td>
                    <td className="p-4 text-emerald-400 font-medium">R$ {Number(func.salario).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL DE CADASTRO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl w-full max-w-lg p-6 relative shadow-2xl my-8">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-white mb-4">Cadastrar Novo Funcionário</h2>

            <form onSubmit={handleCriarFuncionario} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Nome Completo *</label>
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Ex: João da Silva" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Cargo *</label>
                  <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Ex: Vendedor" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Salário (R$) *</label>
                  <input type="number" step="0.01" value={salario} onChange={(e) => setSalario(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="0.00" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">CPF (Apenas números) *</label>
                  <input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="12345678901" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">RG (Apenas números) *</label>
                    <input type="number" value={rg} onChange={(e) => setRg(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="12345678" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">WhatsApp / Telefone *</label>
                  <input type="number" value={telefone} onChange={(e) => setTelefone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="19999999999" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">E-mail *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="exemplo@email.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Nº CTPS (Carteira de Trab.)</label>
                  <input type="number" value={cpts} onChange={(e) => setCpts(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Opcional" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Data de Nascimento *</label>
                  <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors font-sans" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Dependentes</label>
                  <input type="number" value={dependentes} onChange={(e) => setDependentes(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Sexo *</label>
                  <select value={sexo} onChange={(e) => setSexo(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors">
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Estado Civil</label>
                  <select value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors">
                    <option value="Solteiro(a)">Solteiro(a)</option>
                    <option value="Casado(a)">Casado(a)</option>
                    <option value="Divorciado(a)">Divorciado(a)</option>
                    <option value="Viúvo(a)">Viúvo(a)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-700">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-zinc-200 px-4 py-2 rounded-lg font-medium transition-colors">
                  Cancelar
                </button>
                <button type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Salvar Funcionário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}