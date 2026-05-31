-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_locacao" (
    "id_locacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_cliente" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_funcionario" INTEGER NOT NULL,
    "data_evento" DATETIME NOT NULL,
    "data_entrega" DATETIME,
    "data_devolucao" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'RESERVADA',
    "multa" DECIMAL NOT NULL DEFAULT 0.00,
    "preco_total" DECIMAL NOT NULL DEFAULT 0.00,
    CONSTRAINT "locacao_id_funcionario_fkey" FOREIGN KEY ("id_funcionario") REFERENCES "funcionario" ("id_funcionario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "locacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "locacao_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente" ("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_locacao" ("data_devolucao", "data_entrega", "data_evento", "id_cliente", "id_funcionario", "id_locacao", "id_usuario", "multa", "status") SELECT "data_devolucao", "data_entrega", "data_evento", "id_cliente", "id_funcionario", "id_locacao", "id_usuario", "multa", "status" FROM "locacao";
DROP TABLE "locacao";
ALTER TABLE "new_locacao" RENAME TO "locacao";
CREATE INDEX "locacao_id_cliente_idx" ON "locacao"("id_cliente");
CREATE INDEX "locacao_id_funcionario_idx" ON "locacao"("id_funcionario");
CREATE INDEX "locacao_id_usuario_idx" ON "locacao"("id_usuario");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
