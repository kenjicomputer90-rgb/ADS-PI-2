# 🚀 ADS PI2

**Última atualização:** 07/06/2026

Repositório criado para compartilhar e colaborar no desenvolvimento do sistema de **Locação de Trajes**.

---

# 📋 Visão Geral

O projeto é composto por:

* Backend em **Node.js + TypeScript**
* ORM **Prisma**
* Banco de dados **SQLite**
* Frontend em **React + Vite**
* Testes automatizados com **Jest**
* Coleções de testes de API utilizando **Bruno**

---

# 🏗️ Arquitetura do Projeto

O backend utiliza a arquitetura:

```txt
Router
  ↓
Controller
  ↓
Service
  ↓
Prisma ORM
  ↓
Banco de Dados
```

### Responsabilidades

| Camada     | Responsabilidade                |
| ---------- | ------------------------------- |
| Router     | Define endpoints da API         |
| Controller | Recebe e trata requisições HTTP |
| Service    | Implementa regras de negócio    |
| Prisma     | Comunicação com o banco         |
| Database   | Persistência dos dados          |

---

# 📁 Estrutura Geral

```txt
.
├── banco/
├── Bruno/
├── DOC/
├── locacao-trajes-front/
├── prisma/
├── src/
├── testes/
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

---

# 🗄️ banco/

Contém arquivos relacionados ao projeto do banco de dados.

```txt
banco/
├── dev.db
├── PI_BD_DER_Aluguel de Trajes.odm
├── PI_BD_EER_Locacao_trajes.png
├── PI_BD_EER_locacao_trajes.sql
├── PI_BD_EER_locacao_trajes_Tabelas.mwb
└── demais arquivos de modelagem
```

### Conteúdo

* Banco SQLite utilizado durante o desenvolvimento
* Diagramas DER e EER
* Scripts SQL
* Arquivos do MySQL Workbench

---

# 🧪 Bruno/

Coleções de testes utilizadas para validar as rotas da API.

```txt
Bruno/
├── kenjiBruno/
├── laerteBruno/
└── takeshiBruno/
```

Utilizado para:

* Testes de endpoints
* Validação de respostas
* Testes de integração da API

---

# 📚 DOC/

Documentação do projeto.

```txt
DOC/
├── Guia para o desenvolvedor.txt
├── resumo do chatgpt.txt
├── ROTAS_ADMIN_TESTES.md
├── ROTAS_FUNCIONARIO.md
└── arquivos auxiliares
```

Contém:

* Guias de desenvolvimento
* Documentação de rotas
* Resultados de testes
* Materiais de apoio

---

# 💻 locacao-trajes-front/

Frontend da aplicação desenvolvido com React e Vite.

## Estrutura principal

```txt
src/
├── components/
├── pages/
├── services/
├── assets/
└── main.tsx
```

### Páginas implementadas

* Clientes
* Funcionários
* Produtos
* Locações
* Financeiro
* Logística
* Processos

---

# 🗃️ prisma/

Responsável pela persistência de dados.

```txt
prisma/
├── migrations/
├── banco/
├── schema.prisma
└── seed.ts
```

### Componentes

| Arquivo             | Função                  |
| ------------------- | ----------------------- |
| schema.prisma       | Modelagem do banco      |
| migrations          | Histórico de alterações |
| seed.ts             | Dados iniciais          |
| banco/dev-backup.db | Backup local            |

---

# ⚙️ src/

Código-fonte principal da aplicação.

```txt
src/
├── generated/
├── modulos/
├── routes.ts
├── server.ts
└── teste-orm-del.ts
```

---

# 🧩 Módulos do Sistema

```txt
modulos/
├── admin/
├── cliente/
├── financeiro/
├── funcionario/
├── locacoes/
├── logistica/
├── processos/
└── produtos/
```

Cada módulo segue a estrutura:

```txt
modulo/
├── moduloController.ts
├── moduloService.ts
└── moduloRouter.ts
```

## Módulos disponíveis

| Módulo      | Responsabilidade                |
| ----------- | ------------------------------- |
| Admin       | Administração do sistema        |
| Cliente     | Cadastro e gestão de clientes   |
| Funcionário | Gestão de funcionários          |
| Produtos    | Controle de trajes e peças      |
| Locações    | Gerenciamento de locações       |
| Financeiro  | Controle financeiro             |
| Logística   | Movimentação e status das peças |
| Processos   | Processos operacionais          |

---

# 🔄 Fluxo da Requisição

```txt
Cliente
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Prisma ORM
   ↓
SQLite
```

---

# 🧪 Testes

## Jest

Arquivo de configuração:

```txt
jest.config.ts
```

Utilizado para testes unitários dos serviços.

Exemplo:

```txt
produtoService.test.ts
```

---

## Scripts de Teste

```txt
testes/
├── test-admin-routes.sh
├── teste-orm-del.ts
└── teste-orm-ins.ts
```

Utilizados para:

* Testar endpoints
* Testar operações ORM
* Automatizar validações

---

# 🚀 Inicialização do Projeto

## Instalar dependências

```bash
npm install
```

## Executar backend

```bash
npm run start:dev
```

## Executar frontend

```bash
cd locacao-trajes-front

npm install

npm run dev
```

---

# 🛠️ Tecnologias Utilizadas

* TypeScript
* Node.js
* Express
* Prisma ORM
* SQLite
* React
* Vite
* Jest
* Bruno

---

# 📄 Licença

Este projeto está licenciado sob os termos definidos no arquivo:

```txt
LICENSE
```
