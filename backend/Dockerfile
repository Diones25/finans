FROM node:22

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y netcat-openbsd

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]