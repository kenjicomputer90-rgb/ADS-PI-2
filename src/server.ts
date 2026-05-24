// server.ts
import express from "express"
import app from "./routes.js"
const porta=3000

app.use(express.json())

app.listen(porta, () => {
  console.log("Servidor rodando em http://localhost:"+porta)
})
