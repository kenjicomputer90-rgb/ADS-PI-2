#!/bin/bash

# Script de teste das rotas admin para rodar com o servidor em http://localhost:3000
# Antes de usar, inicie o backend:
#   cd /Users/jocilainearaujo/Desktop/PI_2Sem/ADS-PI-2
#   npm run start-dev

BASE_URL="http://localhost:3000"
ADMIN_ID="${ADMIN_ID:-3}"

# Ajuste ADMIN_ID se a sua conta de administrador tiver outro ID na base de dados.
# Exemplo: ADMIN_ID=3 ./test-admin-routes.sh

echo "1) GET /admin/usuarios"
curl -s -X GET "$BASE_URL/admin/usuarios" \
  -H "x-requester-id: $ADMIN_ID" \
  -H "Accept: application/json"
echo -e "\n\n"

echo "2) POST /admin/usuarios"
curl -s -X POST "$BASE_URL/admin/usuarios" \
  -H "Content-Type: application/json" \
  -H "x-requester-id: $ADMIN_ID" \
  -d '{"nome":"Admin Test","email":"admin.test@example.com","senha":"123","perfil_acesso":"administrador"}'
echo -e "\n\n"

echo "3) PUT /admin/usuarios/2"
curl -s -X PUT "$BASE_URL/admin/usuarios/2" \
  -H "Content-Type: application/json" \
  -H "x-requester-id: $ADMIN_ID" \
  -d '{"nome":"Admin Atualizado","perfil_acesso":"administrador"}'
echo -e "\n\n"

echo "4) DELETE /admin/usuarios/2"
curl -s -X DELETE "$BASE_URL/admin/usuarios/2" \
  -H "x-requester-id: $ADMIN_ID"
echo -e "\n\n"

echo "5) GET /admin/permissoes"
curl -s -X GET "$BASE_URL/admin/permissoes" \
  -H "x-requester-id: $ADMIN_ID"
echo -e "\n\n"

echo "6) PUT /admin/permissoes/1"
curl -s -X PUT "$BASE_URL/admin/permissoes/1" \
  -H "Content-Type: application/json" \
  -H "x-requester-id: $ADMIN_ID" \
  -d '{"perfil_acesso":"administrador"}'
echo -e "\n\n"

echo "7) GET /admin/logs"
curl -s -X GET "$BASE_URL/admin/logs" \
  -H "x-requester-id: $ADMIN_ID"
echo -e "\n\n"

echo "8) GET /admin/acoes"
curl -s -X GET "$BASE_URL/admin/acoes" \
  -H "x-requester-id: $ADMIN_ID"
echo -e "\n"
