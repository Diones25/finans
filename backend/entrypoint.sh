#!/bin/sh
set -e # Para o script se houver erro

echo "Aguardando o banco de dados em db:5432..."
while ! nc -z db 5432; do
  sleep 1
done

echo "Banco de dados pronto! Executando migrações..."
npx prisma migrate deploy || echo "Aviso: Falha ao aplicar migrações, mas continuando..."

echo "Iniciando o servidor em modo produção..."
# Usamos o main.js compilado na pasta dist
node dist/main.js