// server.ts
import express from "express"
import app from "./routes.js"


app.use(express.json())

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})