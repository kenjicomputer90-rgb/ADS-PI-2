import administradorRouter from "./modulos/administrador/administradorRouter.js";
import clienteRouter from "./modulos/cliente/clienteRouter.js";
import cors from "cors"
import express from "express"
import funcionarioRouter from "./modulos/funcionario/funcionarioRouter.js";
import produtoRouter from "./modulos/produtos/produtosRouter.js";


const app = express();



// <-- 2. ADICIONE ESTA LINHA AQUI (Libera o acesso para o seu Front-end)
app.use(cors({
  origin: "http://localhost:5173", // URL do seu Vite Front-end
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json())
 
app.use("/cliente", clienteRouter)
app.use("/administrador", administradorRouter)
app.use("/funcionario", funcionarioRouter)
app.use("/produtos", produtoRouter)

export default app
