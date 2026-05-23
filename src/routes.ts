import administradorRouter from "./modulos/administrador/administradorRouter.js";
import clienteRouter from "./modulos/cliente/clienteRouter.js";
import express from "express"
import funcionarioRouter from "./modulos/funcionario/funcionarioRouter.js";
import produtoRouter from "./modulos/produtos/produtosRouter.js";

const app = express();
app.use(express.json())

app.use("/cliente", clienteRouter)
app.use("/administrador", administradorRouter)
app.use("/funcionario", funcionarioRouter)
app.use("/produtos", produtoRouter)

export default app
