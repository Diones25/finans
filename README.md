# Finans - Sistema de Gerenciamento Financeiro

Este é um projeto fullstack de gerenciamento financeiro, desenvolvido para controle de gastos, categorias e acompanhamento de obras (construção). O sistema é totalmente conteinerizado utilizando Docker para facilitar o desenvolvimento e implantação.

## 🚀 Tecnologias Utilizadas

### Backend
- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma 7](https://www.prisma.io/) (com suporte a `prisma.config.ts`)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Linguagem:** TypeScript
- **Documentação:** Swagger (disponível em `/api`)
- **Outros:** Class Validator, Class Transformer, Sanitize HTML.

### Frontend
- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Gerenciamento de Estado/Queries:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Roteamento:** React Router Dom
- **Formulários:** React Hook Form + Zod
- **Servidor Web:** Nginx (para o container de produção)

---

## 📂 Estrutura do Projeto

```text
/
├── backend/          # API NestJS
├── frontend/         # Aplicação React
├── compose.yaml      # Orquestração de containers Docker
└── README.md         # Documentação principal
```

---

## ⚙️ Configuração Inicial

### Pré-requisitos
- Docker e Docker Compose instalados.

### Variáveis de Ambiente

#### Backend (`/backend/.env`)
Crie um arquivo `.env` baseado no `.env.example`:
```env
DATABASE_URL="postgresql://postgres:db_password@db:5432/db_name?schema=public"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=db_password
POSTGRES_DB=db_name
```
*Nota: No Docker, o host do banco de dados deve ser `db`.*

#### Frontend (`/frontend/.env`)
```env
VITE_API_URL=""
```
*Nota: Deixe vazio para que o Nginx faça o proxy reverso automático.*

---

## 🛠️ Como Executar

Para subir todo o ecossistema (Banco de Dados, Backend e Frontend), utilize o comando:

```bash
docker compose up -d --build
```

Após o build, os serviços estarão disponíveis em:
- **Frontend:** [http://localhost:80](http://localhost:80) (ou o domínio configurado)
- **Backend (API):** [http://localhost:3000](http://localhost:3000)
- **Documentação API (Swagger):** [http://localhost:3000/api](http://localhost:3000/api)

---

## 🌐 Configuração de Domínio Amigável (Opcional)

Se desejar acessar o projeto via `http://finans.com` em vez de localhost:

1. **Arquivo Hosts:** Adicione a seguinte linha ao arquivo de hosts do seu sistema (`C:\Windows\System32\drivers\etc\hosts` no Windows ou `/etc/hosts` no Linux/Mac):
   ```text
   127.0.0.1 finans.com
   ```

2. **Acesso:** O projeto responderá automaticamente em [http://finans.com](http://finans.com) devido ao mapeamento da porta 80 no `compose.yaml`.

---

## 📖 Como o Projeto Funciona

### Fluxo de Dados
1. O **Nginx** (container frontend) recebe as requisições.
2. Se a requisição for para uma rota de API (`/spent`, `/category`, `/construction`), o Nginx a encaminha para o container **backend**.
3. O **Backend** processa a lógica de negócio, valida os dados e utiliza o **Prisma** para interagir com o **PostgreSQL**.
4. O **Prisma 7** utiliza um adaptador nativo (`@prisma/adapter-pg`) para gerenciar as conexões com o banco de dados de forma otimizada.

### Funcionalidades
- **Categorias:** Criação, edição e exclusão de categorias com controle de saldo.
- **Gastos:** Registro de gastos vinculados a categorias, com validação automática de saldo disponível.
- **Construção:** Módulo específico para acompanhamento de itens de obra, quantidades e valores unitários.
- **Paginação:** Listagem de gastos e itens de construção com suporte a paginação no backend e frontend.
