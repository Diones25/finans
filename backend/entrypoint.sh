#!/bin/sh
set -e # Para o script se houver erro

echo "Aguardando o banco de dados em db:5432..."
while ! nc -z db 5432; do
  sleep 1
done

echo "Banco de dados pronto! Executando migracoes..."
npx prisma migrate deploy || echo "Aviso: Falha ao aplicar migracoes, mas continuando..."

echo "Iniciando o servidor em modo producao..."
node dist/main.js
