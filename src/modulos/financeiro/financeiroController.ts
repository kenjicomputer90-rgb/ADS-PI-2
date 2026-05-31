import { Request, Response } from 'express';
import { FinanceiroService } from './financeiroService';

const financeiroService = new FinanceiroService();

export async function obterRelatorioManutencao(req: Request, res: Response) {
  try {
    const relatorio = await financeiroService.calculaFaturamentoManutencao();
    // Status 200 OK para listagem/leitura com sucesso (Aula 11 e 12)
    return res.status(200).json(relatorio);
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
}
