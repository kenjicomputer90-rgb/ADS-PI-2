import clienteRouter from "./modulos/cliente/clienteRouter.js";
import express from "express"

const app = express();
app.use(express.json())

app.use(clienteRouter)

export default app