/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Funcionario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cliente";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Funcionario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ajuste" (
    "id_ajuste" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_item" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    CONSTRAINT "ajuste_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item_locacao" ("id_item") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cliente" (
    "id_cliente" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "rg" TEXT,
    "medidas" TEXT,
    "data_nascimento" DATETIME,
    CONSTRAINT "cliente_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "funcionario" (
    "id_funcionario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT,
    "telefone" TEXT,
    "ctps" TEXT,
    "dependente" INTEGER DEFAULT 0,
    "sexo" TEXT,
    "salario" DECIMAL,
    "data_nascimento" DATETIME,
    "estado_civil" TEXT,
    CONSTRAINT "funcionario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "administrador" (
    "id_administrador" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT,
    "data_nascimento" DATETIME,
    CONSTRAINT "administrador_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "historico_peca" (
    "id_historico" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_peca" INTEGER NOT NULL,
    "id_status" INTEGER NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME,
    CONSTRAINT "historico_peca_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status_peca" ("id_status") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "historico_peca_id_peca_fkey" FOREIGN KEY ("id_peca") REFERENCES "peca_produto" ("id_peca") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "item_locacao" (
    "id_item" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_locacao" INTEGER NOT NULL,
    "id_peca" INTEGER NOT NULL,
    CONSTRAINT "item_locacao_id_peca_fkey" FOREIGN KEY ("id_peca") REFERENCES "peca_produto" ("id_peca") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "item_locacao_id_locacao_fkey" FOREIGN KEY ("id_locacao") REFERENCES "locacao" ("id_locacao") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "locacao" (
    "id_locacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_cliente" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_funcionario" INTEGER NOT NULL,
    "data_evento" DATETIME NOT NULL,
    "data_entrega" DATETIME,
    "data_devolucao" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'RESERVADA',
    CONSTRAINT "locacao_id_funcionario_fkey" FOREIGN KEY ("id_funcionario") REFERENCES "funcionario" ("id_funcionario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "locacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "locacao_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente" ("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "manutencao" (
    "id_manutencao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_peca" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_manutencao" DATETIME NOT NULL,
    CONSTRAINT "manutencao_id_peca_fkey" FOREIGN KEY ("id_peca") REFERENCES "peca_produto" ("id_peca") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id_pagamento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_locacao" INTEGER NOT NULL,
    "valor" DECIMAL NOT NULL,
    CONSTRAINT "pagamento_id_locacao_fkey" FOREIGN KEY ("id_locacao") REFERENCES "locacao" ("id_locacao") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "peca_produto" (
    "id_peca" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo_unico" TEXT,
    "descricao" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "material" TEXT,
    "preco" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "status_peca" (
    "id_status" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil_acesso" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "ajuste_id_item_idx" ON "ajuste"("id_item");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_id_usuario_key" ON "cliente"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_cpf_key" ON "cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_id_usuario_key" ON "funcionario"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_cpf_key" ON "funcionario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_id_usuario_key" ON "administrador"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_cpf_key" ON "administrador"("cpf");

-- CreateIndex
CREATE INDEX "historico_peca_id_peca_idx" ON "historico_peca"("id_peca");

-- CreateIndex
CREATE INDEX "historico_peca_id_status_idx" ON "historico_peca"("id_status");

-- CreateIndex
CREATE INDEX "item_locacao_id_locacao_idx" ON "item_locacao"("id_locacao");

-- CreateIndex
CREATE INDEX "item_locacao_id_peca_idx" ON "item_locacao"("id_peca");

-- CreateIndex
CREATE INDEX "locacao_id_cliente_idx" ON "locacao"("id_cliente");

-- CreateIndex
CREATE INDEX "locacao_id_funcionario_idx" ON "locacao"("id_funcionario");

-- CreateIndex
CREATE INDEX "locacao_id_usuario_idx" ON "locacao"("id_usuario");

-- CreateIndex
CREATE INDEX "manutencao_id_peca_idx" ON "manutencao"("id_peca");

-- CreateIndex
CREATE INDEX "pagamento_id_locacao_idx" ON "pagamento"("id_locacao");

-- CreateIndex
CREATE UNIQUE INDEX "peca_produto_codigo_unico_key" ON "peca_produto"("codigo_unico");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
