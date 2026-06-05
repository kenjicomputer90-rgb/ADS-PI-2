# Testes das rotas Admin

Todas as rotas administrativas usam o prefixo `/admin` e exigem o header:

```http
x-requester-id: <id_do_usuario_administrador>
```

Esse usuário deve existir em `usuario` com `perfil_acesso` igual a `"administrador"`.

## 1) POST /admin/usuarios
Cria um novo usuário.

Request:
```http
POST http://localhost:3000/admin/usuarios
Content-Type: application/json
x-requester-id: 1

{
  "nome": "Admin Test",
  "email": "admin.test@example.com",
  "senha": "123",
  "perfil_acesso": "administrador"
}
```

Resposta esperada:
- HTTP 201
- JSON com `id_usuario`, `nome`, `email`, `perfil_acesso`

## 2) GET /admin/usuarios
Lista todos os usuários.

Request:
```http
GET http://localhost:3000/admin/usuarios
x-requester-id: 1
```

Resposta esperada:
- HTTP 200
- Array de objetos com `id_usuario`, `nome`, `email`, `perfil_acesso`

## 3) PUT /admin/usuarios/:id
Atualiza um usuário existente.

Request:
```http
PUT http://localhost:3000/admin/usuarios/2
Content-Type: application/json
x-requester-id: 1

{
  "nome": "Admin Atualizado",
  "perfil_acesso": "administrador"
}
```

Resposta esperada:
- HTTP 200
- JSON do usuário atualizado

## 4) DELETE /admin/usuarios/:id
Remove um usuário.

Request:
```http
DELETE http://localhost:3000/admin/usuarios/2
x-requester-id: 1
```

Resposta esperada:
- HTTP 200
- JSON `{ "message": "Usuário deletado", "id": 2 }`

## 5) GET /admin/permissoes
Lista todos os perfis existentes a partir de `usuario.perfil_acesso`.

Request:
```http
GET http://localhost:3000/admin/permissoes
x-requester-id: 1
```

Resposta esperada:
- HTTP 200
- Array de strings, por exemplo: `["administrador", "cliente"]`

## 6) PUT /admin/permissoes/:id
Altera o perfil de acesso de um usuário.

Request:
```http
PUT http://localhost:3000/admin/permissoes/2
Content-Type: application/json
x-requester-id: 1

{
  "perfil_acesso": "administrador"
}
```

Resposta esperada:
- HTTP 200
- JSON do usuário com novo `perfil_acesso`

## 7) GET /admin/logs
Retorna logs de auditoria do admin em memória.

Request:
```http
GET http://localhost:3000/admin/logs
x-requester-id: 1
```

Resposta esperada:
- HTTP 200
- Array de logs com campos `id_log`, `id_usuario`, `acao`, `alvo`, `descricao`, `data`

## 8) GET /admin/acoes
Retorna tipos de ação possíveis.

Request:
```http
GET http://localhost:3000/admin/acoes
x-requester-id: 1
```

Resposta esperada:
- HTTP 200
- Array de objetos `{ "nome": "CRIAR_USUARIO", "descricao": "CRIAR_USUARIO" }`, etc.

## Observações
- Se o header `x-requester-id` não for informado ou o usuário não for administrador, o servidor retorna 401/403.
- Para testar localmente, primeiro garanta que o servidor esteja rodando em `http://localhost:3000`.
- Caso precise, use o arquivo `prisma/seed.ts` para criar o usuário administrador inicial com `id_usuario: 1`.

## Exemplos com curl

### Criar usuário admin
```bash
curl -X POST http://localhost:3000/admin/usuarios \
  -H "Content-Type: application/json" \
  -H "x-requester-id: 1" \
  -d '{"nome":"Admin Test","email":"admin.test@example.com","senha":"123","perfil_acesso":"administrador"}'
```

### Listar usuários
```bash
curl -X GET http://localhost:3000/admin/usuarios \
  -H "x-requester-id: 1"
```

### Atualizar usuário
```bash
curl -X PUT http://localhost:3000/admin/usuarios/2 \
  -H "Content-Type: application/json" \
  -H "x-requester-id: 1" \
  -d '{"nome":"Admin Atualizado","perfil_acesso":"administrador"}'
```

### Deletar usuário
```bash
curl -X DELETE http://localhost:3000/admin/usuarios/2 \
  -H "x-requester-id: 1"
```

### Listar permissões
```bash
curl -X GET http://localhost:3000/admin/permissoes \
  -H "x-requester-id: 1"
```

### Atualizar permissão de usuário
```bash
curl -X PUT http://localhost:3000/admin/permissoes/2 \
  -H "Content-Type: application/json" \
  -H "x-requester-id: 1" \
  -d '{"perfil_acesso":"administrador"}'
```

### Listar logs
```bash
curl -X GET http://localhost:3000/admin/logs \
  -H "x-requester-id: 1"
```

### Listar ações
```bash
curl -X GET http://localhost:3000/admin/acoes \
  -H "x-requester-id: 1"
```
