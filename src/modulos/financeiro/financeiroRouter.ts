import { Router } from "express";
import {
  addFinanceiroController, returnFinanceiroController, removeFinanceiroController, changeFinanceiroController
} 
from "./financeiroController.js";

const financeiroRouter = Router();

financeiroRouter.post("/", addFinanceiroController);

financeiroRouter.get("/", returnFinanceiroController);

financeiroRouter.delete("/", removeFinanceiroController);

financeiroRouter.patch("/", changeFinanceiroController);

export default financeiroRouter;