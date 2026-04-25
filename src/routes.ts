import administradorRouter from "./modulos/administrador/administradorRouter.js";
import clienteRouter from "./modulos/cliente/clienteRouter.js";
import express from "express"
import funcionarioRouter from "./modulos/funcionario/funcionarioRouter.js";

const app = express();
app.use(express.json())

app.use(clienteRouter)
app.use(administradorRouter)
app.use(funcionarioRouter)

export default app