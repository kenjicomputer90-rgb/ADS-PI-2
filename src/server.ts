// server.ts
import express from "express"
import userRoutes from "./modulos/teste/testeRouter.js"

const app = express()

app.use(express.json())
app.use(userRoutes)

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})