#!/bin/sh

echo "Aguardando o banco de dados em db:5432..."
while ! nc -z db 5432; do
  sleep 1
done

echo "Banco de dados pronto! Executando migrações..."
npx prisma migrate deploy

echo "Migrações aplicadas! Fazendo o build do projeto..."
npm run build

echo "Iniciando o servidor..."
npm start

echo "Servidor iniciado!"