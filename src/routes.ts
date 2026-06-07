import adminRouter from "./modulos/admin/adminRouter.js";
import clienteRouter from "./modulos/cliente/clienteRouter.js";
import cors from "cors"
import express from "express"
import funcionarioRouter from "./modulos/funcionario/funcionarioRouter.js";
import produtoRouter from "./modulos/produtos/produtosRouter.js";
import financeiroRouter from "./modulos/financeiro/financeiroRouter.js";
import locacaoRouter from "./modulos/locacoes/locacaoRouter.js"
import logisticaRouter from "./modulos/logistica/logisticaRouter.js"
import processosRouter from "./modulos/processos/processosRouter.js"

const app = express();

// <-- 2. ADICIONE ESTA LINHA AQUI (Libera o acesso para o seu Front-end)
app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5176"
    ], // URL do seu Vite Front-end
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requester-Id"],
  credentials: true
}));

app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({      
    mensagem: "API ADS-PI-2 funcionando",
    modulos: ["locacoes", "logistica", "processos"],
  })
})
 
app.use("/clientes", clienteRouter)
app.use("/admin", adminRouter)
app.use("/funcionarios", funcionarioRouter)
app.use("/produtos", produtoRouter)
app.use("/financeiro", financeiroRouter);

app.use("/locacoes", locacaoRouter)
app.use("/logistica", logisticaRouter)
app.use("/processos", processosRouter)

export default app
