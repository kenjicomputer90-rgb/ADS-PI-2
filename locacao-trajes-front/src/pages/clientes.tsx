import { Cliente } from '../@types/ndex';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca os clientes assim que a tela carrega
  useEffect(() => {
    api.get('/cliente') // Bate na rota app.use("/cliente", clienteRouter)
      .then((response) => {
        // Garantindo que a resposta seja uma array antes de salvar no estado
        if (Array.isArray(response.data)) {
          setClientes(response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 bg-zinc-900 min-h-screen text-zinc-100">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-zinc-400 mt-1">Gerenciamento de clientes cadastrados no sistema.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Novo Cliente
        </button>
      </header>

      {loading ? (
        <p className="text-zinc-400 animate-pulse">Carregando clientes...</p>
      ) : (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden">
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
                    <td className="p-4 truncate max-w-xs">{cliente.endereco}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}