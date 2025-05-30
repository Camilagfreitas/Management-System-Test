# Management System – BFF + Frontend

Esta é uma aplicação de **gerenciamento de tarefas**, que também oferece um **dashboard analítico** para acompanhamento e visualização do progresso das atividades.

Este repositório é um **monorepo** que contém dois pacotes principais:

- **BFF** (Backend For Frontend): construído com Node.js, Express e JSON Server para simulação de APIs.
- **Frontend**: aplicação desenvolvida em React com Vite.

---

## 🛠 Tecnologias Utilizadas

**BFF:**

- Node.js
- Express
- JSON Server (Mock API)
- Swagger (Documentação da API)

**Frontend:**

- React
- Vite
- Axios
- React Router
- Radix (Shadcn)

---

## Como Executar o Projeto

### 1. Instalar as dependências

**BFF:**

```bash
cd bff
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

---

### 2. Iniciar o BFF (Mock API + Servidor Express)

No diretório `bff`, execute:

```bash
npm run mock
npm run dev
```

A documentação Swagger da API estará disponível em:  
[http://localhost:3000/api-docs/#/](http://localhost:3000/api-docs/#/)

---

### 3. Iniciar o Frontend

No diretório `frontend`, execute:

```bash
npm run dev
```

A aplicação React estará disponível em:  
[http://localhost:5173/](http://localhost:5173/)

---

### 4. Acessar a Plataforma

1. Acesse [http://localhost:5173/](http://localhost:5173/)
2. Clique em **"Cadastre-se"** para criar uma conta.
3. Faça login com os dados cadastrados para acessar a plataforma.

---

## Executar os Testes

Em ambos os diretórios `bff` e `frontend`, execute:

```bash
npm run test
```

---
