import { Request, Response } from "express";
import * as financeiroService from "./financeiroService.js";

export async function addFinanceiroController(req: Request, res: Response) {
  try {
    const { id_locacao, valor } = req.body;
    const novoPagamento = await financeiroService.addFinanceiro(Number(id_locacao), Number(valor));
    return res.status(201).json(novoPagamento);
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function returnFinanceiroController(req: Request, res: Response) {
  try {
    
    const relatorioFaturamento = await financeiroService.obterFaturamentoTotal();
   
       const relatorioCustos = await financeiroService.obterCustosSalariais();
   
        const lucroLiquidoEstimado = relatorioFaturamento.faturamentoBrutoTotal - relatorioCustos.custoSalarialTotal;
   
        return res.status(200).json({
      metricas_receita: {
        total_locações_realizadas: relatorioFaturamento.quantidadeLocacoes,
        arrecadacao_base_trajes: relatorioFaturamento.faturamentoBaseLocacoes,
        arrecadacao_multas_atraso: relatorioFaturamento.faturamentoPorMultas,
        faturamento_bruto: relatorioFaturamento.faturamentoBrutoTotal
      },
      metricas_despesa: {
        total_funcionarios_ativos: relatorioCustos.totalFuncionarios,
        folha_pagamento_salarios: relatorioCustos.custoSalarialTotal
      },
      balanco_geral: {
        lucro_liquido_periodo: lucroLiquidoEstimado,
        status_financeiro: lucroLiquidoEstimado >= 0 ? "LUCRO" : "PREJUIZO"
      }
    });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function removeFinanceiroController(req: Request, res: Response) {
  try {
    const { id } = req.body;
    await financeiroService.removeManutencao(Number(id));
    return res.status(200).json({ mensagem: "Registro de manutenção removido com sucesso" });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function changeFinanceiroController(req: Request, res: Response) {
  try {
    const { id, descricao } = req.body;
    const atualizado = await financeiroService.changeManutencao(Number(id), descricao);
    return res.status(200).json(atualizado);
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}