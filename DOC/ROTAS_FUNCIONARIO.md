# Rotas do Funcionário / Vendedor

Este documento descreve as rotas implementadas para a parte do funcionário/vendedor, envolvendo locações, logística e processos internos.

---

## 1. Locações

### Criar locação

```http
POST /locacoes
```

Cria uma nova locação para um cliente e reserva uma peça disponível.

Exemplo de body:

```json
{
  "id_cliente": 1,
  "id_usuario": 1,
  "id_funcionario": 1,
  "id_peca": 1,
  "data_evento": "2026-06-10"
}
```

Regras:

* o cliente deve existir;
* o usuário deve existir;
* o funcionário deve existir;
* a peça deve existir;
* a peça precisa estar com status Disponível.

---

### Cancelar locação

```http
POST /locacoes/:id/cancelar
```

Cancela uma locação e libera a peça novamente para o status Disponível.

---

### Registrar entrega

```http
POST /locacoes/:id/entrega
```

Registra a entrega da peça ao cliente.

Altera:

* locação para `ENTREGUE`;
* peça para `Alugado`.

---

### Registrar devolução

```http
POST /locacoes/:id/devolucao
```

Registra a devolução da peça.

Altera:

* locação para `DEVOLVIDA`;
* peça para `Em Preparação`.

---

### Trocar peça

```http
POST /locacoes/:id/troca
```

Troca a peça vinculada a uma locação.

Exemplo de body:

```json
{
  "novaPecaId": 2
}
```

Regras:

* a locação deve existir;
* a locação precisa estar reservada;
* a nova peça precisa estar disponível.

---

## 2. Logística

### Listar estoque

```http
GET /logistica/estoque
```

Lista as peças cadastradas e seus status atuais.

---

### Separar peça

```http
POST /logistica/separacao
```

Altera a peça para o status `Em Preparação`.

Exemplo de body:

```json
{
  "id_peca": 1
}
```

---

### Conferência de saída

```http
POST /logistica/conferencia-saida
```

Confirma a saída da peça e altera o status para `Alugado`.

Exemplo de body:

```json
{
  "id_peca": 1
}
```

---

### Conferência de devolução

```http
POST /logistica/conferencia-devolucao
```

Confirma a devolução da peça.

Exemplo de body:

```json
{
  "id_peca": 1,
  "possuiAvaria": false
}
```

Regras:

* se `possuiAvaria` for `true`, a peça vai para `Em Manutenção`;
* se `possuiAvaria` for `false`, a peça volta para `Disponível`.

---

### Listar peças em preparação

```http
GET /logistica/preparacao
```

Lista todas as peças com status atual `Em Preparação`.

---

## 3. Processos

### Kanban

```http
GET /processos/kanban
```

Lista as locações separadas por status:

* reservadas;
* entregues;
* devolvidas;
* canceladas.

---

### Atrasos

```http
GET /processos/atrasos
```

Lista locações com data do evento anterior à data atual e que ainda não foram devolvidas ou canceladas.

---

### Devoluções pendentes

```http
GET /processos/devolucoes
```

Lista locações com status `ENTREGUE`, ou seja, que ainda aguardam devolução.

---

### Alerta de atraso

```http
POST /processos/alerta-atraso
```

Busca locações atrasadas e retorna uma simulação de alerta.

---

## 4. Rota inicial

```http
GET /
```

Confirma que a API está funcionando.

Retorno esperado:

```json
{
  "mensagem": "API ADS-PI-2 funcionando",
  "modulos": ["locacoes", "logistica", "processos"]
}
```

---

## 5. Status usados

### Status da locação

* `RESERVADA`
* `ENTREGUE`
* `DEVOLVIDA`
* `CANCELADA`

### Status da peça

* `1 - Disponível`
* `2 - Alugado`
* `3 - Em Manutenção`
* `4 - Vendido`
* `5 - Reservado`
* `6 - Em Preparação`