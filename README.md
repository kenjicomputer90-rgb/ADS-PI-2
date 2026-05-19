<h1>🚀 ADS PI2</h1>
<br>
<p> Repositorio criado para compartilhar e colaborar no código fonte do projeto ADS PI2. </p>
<cria banco de dados>
<cria prisma-orm para mapear o banco locacao_trajes>

# 📚 Arquitetura do Projeto

Este projeto utiliza uma arquitetura baseada em:

> **Controller → Service → Router → Database**

Cada funcionalidade do sistema fica separada em módulos para facilitar organização e manutenção.

---

# 📁 Estrutura Principal

```txt
src/
├── generated/
├── modulos/
├── database/
├── utils/
├── routes.ts
└── server.ts
```

---

# ⚙️ generated/

Pasta gerada automaticamente pelo Prisma.

Responsável pela comunicação entre a aplicação e o banco de dados.

---

# 🧩 modulos/

Contém os módulos do sistema.

Exemplo:

```txt
modulos/
├── cliente/
├── teste/
└── funcionario/
```

Cada módulo segue uma estrutura parecida:

```txt
nomeDoModulo/
├── moduloController.ts
├── moduloService.ts
└── moduloRouter.ts
```

## Responsabilidades

| Arquivo | Função |
|---|---|
| `Controller` | Recebe requisições HTTP |
| `Service` | Contém regras de negócio |
| `Router` | Define as rotas |

---

# 🗄️ database/

Responsável pela configuração do banco de dados.

```txt
database/
├── databaseConfig.ts
└── schema.prisma
```

| Arquivo | Função |
|---|---|
| `schema.prisma` | Estrutura do banco |
| `databaseConfig.ts` | Configuração da conexão |

---

# 🧰 utils/

Funções auxiliares reutilizáveis.

---

# 🌐 routes.ts

Centraliza todas as rotas da aplicação.

Exemplo:

```ts
app.use("/cliente", clienteRouter)
```

---

# ⚡ server.ts

Ponto de entrada da aplicação.

Responsável por:

- iniciar o Express
- configurar middlewares
- carregar rotas
- iniciar o servidor

---

# 🔁 Fluxo da Requisição

```txt
server.ts
   ↓
routes.ts
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Banco de Dados
```
