import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { DollarSign, TrendingUp, TrendingDown, Users, Receipt, AlertTriangle } from 'lucide-react';

interface MetricasFinanceiras {
  metricas_receita: {
    total_locacoes_realizadas: number;
    arrecadacao_base_trajes: number;
    arrecadacao_multas_atraso: number;
    faturamento_bruto: number;
  };
  metricas_despesa: {
    total_funcionarios_ativos: number;
    folha_pagamento_salarios: number;
  };
  balanco_geral: {
    lucro_liquido_periodo: number;
    status_financeiro: 'LUCRO' | 'PREJUIZO';
  };
}

export function Financeiro() {
  const [dados, setDados] = useState<MetricasFinanceiras | null>(null);
  const [loading, setLoading] = useState(true);

  const carregarDadosFinanceiros = async () => {
    setLoading(true);
    try {
      const response = await api.get('/financeiro'); // Bate no seu returnFinanceiroController
      setDados(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados financeiros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDadosFinanceiros();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-zinc-950 min-h-screen text-white space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestão Financeira</h1>
        <p className="text-sm text-zinc-400">Fluxo de caixa, controle de notas, faturamentos e balanço geral de trajes.</p>
      </div>

      {/* Cards de Visão Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Balanço Geral */}
        <div className={`p-5 rounded-xl border ${dados?.balanco_geral.status_financeiro === 'LUCRO' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Balanço Geral (Líquido)</span>
            <DollarSign size={20} className={dados?.balanco_geral.status_financeiro === 'LUCRO' ? 'text-emerald-400' : 'text-red-400'} />
          </div>
          <p className={`text-3xl font-extrabold ${dados?.balanco_geral.status_financeiro === 'LUCRO' ? 'text-emerald-400' : 'text-red-400'}`}>
            R$ {dados?.balanco_geral.lucro_liquido_periodo.toFixed(2)}
          </p>
          <span className="text-xs text-zinc-500 mt-1 block">Receita Bruta menos Custos Salariais</span>
        </div>

        {/* Faturamento Bruto */}
        <div className="p-5 rounded-xl border bg-zinc-900 border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Faturamento Bruto</span>
            <TrendingUp size={20} className="text-blue-400" />
          </div>
          <p className="text-3xl font-extrabold text-zinc-100">
            R$ {dados?.metricas_receita.faturamento_bruto.toFixed(2)}
          </p>
          <span className="text-xs text-blue-400 font-medium mt-1 block">
            {dados?.metricas_receita.total_locacoes_realizadas} Locações efetuadas
          </span>
        </div>

        {/* Despesas Fixas */}
        <div className="p-5 rounded-xl border bg-zinc-900 border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Folha de Pagamento</span>
            <TrendingDown size={20} className="text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-zinc-100">
            R$ {dados?.metricas_despesa.folha_pagamento_salarios.toFixed(2)}
          </p>
          <span className="text-xs text-zinc-500 mt-1 block">
            {dados?.metricas_despesa.total_funcionarios_ativos} Funcionários ativos sob regime CLT
          </span>
        </div>
      </div>

      {/* Detalhamento Analítico */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Origem das Receitas */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Receipt className="text-blue-500" size={18} />
            Origem das Entradas (Notas)
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-zinc-950 rounded-lg border border-zinc-800">
              <div>
                <p className="text-sm font-medium">Aluguéis Base de Trajes</p>
                <p className="text-xs text-zinc-500">Valor nominal acordado em contrato</p>
              </div>
              <p className="font-semibold text-zinc-200">R$ {dados?.metricas_receita.arrecadacao_base_trajes.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center p-3 bg-zinc-950 rounded-lg border border-zinc-800">
              <div>
                <p className="text-sm font-medium flex items-center gap-1.5 text-amber-400">
                  <AlertTriangle size={14} />
                  Multas por Devoluções em Atraso
                </p>
                <p className="text-xs text-zinc-500">Acréscimos computados pós-evento</p>
              </div>
              <p className="font-semibold text-amber-400">R$ {dados?.metricas_receita.arrecadacao_multas_atraso.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Quadro Informativo de Seguridade */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Users className="text-purple-500" size={18} />
              Auditoria e Compliance
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Este painel consolida de forma estrita as transações geradas pelo banco SQLite local. 
              Toda alteração de status operacional (Logística / Devolução de peças em atraso) gera gatilhos automáticos de atualização neste faturamento.
            </p>
          </div>
          <div className="pt-4 border-t border-zinc-800 mt-4 flex justify-end">
            <button 
              onClick={carregarDadosFinanceiros}
              className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Recarregar Métricas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}