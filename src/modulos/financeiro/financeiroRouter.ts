import { Router } from "express";
import {
  addPagamentoController, returnFinanceiroController, removeFinanceiroController, changeFinanceiroController
} 
from "./financeiroController.js";

const financeiroRouter = Router();

financeiroRouter.post("/", addPagamentoController);

financeiroRouter.get("/", returnFinanceiroController);

financeiroRouter.delete("/", removeFinanceiroController);

financeiroRouter.patch("/", changeFinanceiroController);

export default financeiroRouter;