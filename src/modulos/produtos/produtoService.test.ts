// produto.service.test.ts

import { addProduto } from "./produtosService"

// Mock do Prisma
jest.mock("@prisma/client", () => {

  const createMock = jest.fn()

  return {
    PrismaClient: jest.fn(() => ({
      peca_produto: {
        create: createMock
      }
    }))
  }
})

describe("addProduto", () => {

  it("deve criar um produto corretamente", async () => {

    // Prisma mockado
    const { PrismaClient } = require("@prisma/client")
    const prisma = new PrismaClient()

    // Produto fake que o banco retornaria
    const produtoMockado = {
      id: 1,
      codigo_unico: "Cadeira",
      descricao: "Cadeira gamer",
      tamanho: "42",
      cor: "Preta",
      material: "Couro",
      preco: 500,
      historico_peca: [
        {
          id_status: 1
        }
      ]
    }

    // Define retorno do create()
    prisma.peca_produto.create.mockResolvedValue(produtoMockado)

    // Executa função
    const resultado = await addProduto(
      "Cadeira",
      "Couro",
      "Cadeira gamer",
      500,
      "disponível",
      42,
      "Preta"
    )

    // Verifica se o create foi chamado corretamente
    expect(prisma.peca_produto.create).toHaveBeenCalledWith({
      data: {
        codigo_unico: "Cadeira",
        descricao: "Cadeira gamer",
        tamanho: "42",
        cor: "Preta",
        material: "Couro",
        preco: 500,
        historico_peca: {
          create: {
            id_status: 1,
            data_inicio: expect.any(Date)
          }
        }
      },
      include: {
        historico_peca: true
      }
    })

    // Verifica retorno
    expect(resultado).toEqual(produtoMockado)
  })

})