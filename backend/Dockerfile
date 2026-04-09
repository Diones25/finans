FROM node:22

WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza cache do Docker)
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

RUN npm install

# Copia o restante dos arquivos
COPY . .

# Instala dependências do sistema, gera o Prisma Client e faz o build
RUN apt-get update && apt-get install -y netcat-openbsd
RUN npx prisma generate
RUN echo "Building application..."
RUN npm run build --verbose
RUN if [ ! -f dist/main.js ]; then echo "Build failed: dist/main.js not found"; exit 1; fi
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]