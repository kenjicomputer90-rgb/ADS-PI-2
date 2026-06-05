import { Router } from 'express';
import { obterRelatorioManutencao } from './financeiroController';

const financeiroRouter = Router();

// Endpoint que devolve o faturamento de manutenções/defeitos (Aula 12)
financeiroRouter.get('/manutencao', obterRelatorioManutencao);

export default financeiroRouter;
