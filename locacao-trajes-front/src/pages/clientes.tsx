import React, { useEffect, useState } from 'react';
import { clienteService } from '../services/api';
import { Plus, Trash2 } from 'lucide-react';

export default function Clientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
  try {
    const response = await clienteService.listar();
    
    // ADICIONE ESTA LINHA AQUI:
    console.log("Dados que vieram do Back-end:", response.data);
    
    setClientes(response.data);
  } catch (error) {
    console.error("Erro ao buscar clientes do back-end", error);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) return;

    try {
      await clienteService.criar({ nome, email });
      setNome('');
      setEmail('');
      carregarClientes(); // Atualiza a tabela
    } catch (error) {
      console.error("Erro ao cadastrar cliente", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Clientes</h1>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Ex: Guilherme Takeshi"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="exemplo@email.com"
          />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
          <Plus size={18} /> Cadastrar
        </button>
      </form>

      {/* Tabela de Listagem */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-semibold">
              <th className="p-4">ID</th>
              <th className="p-4">Nome</th>
              <th className="p-4">E-mail</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-400">Nenhum cliente retornado do banco de dados.</td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="p-4 font-mono text-xs text-gray-500">{cliente.id}</td>
                  <td className="p-4 font-medium text-gray-900">{cliente.nome}</td>
                  <td className="p-4">{cliente.email}</td>
                  <td className="p-4 text-center">
                    <button className="text-red-500 hover:text-red-700 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}