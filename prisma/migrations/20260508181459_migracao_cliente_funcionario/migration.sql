-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "data_nascimento" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpts" TEXT NOT NULL,
    "dependentes" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL,
    "salario" REAL NOT NULL,
    "data_de_nascimento" TEXT NOT NULL,
    "estado_civil" TEXT NOT NULL
);
