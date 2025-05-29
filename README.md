# Management System: BFF + Frontend

Este projeto é um monorepo que contém dois principais pacotes:

- **BFF**: Backend For Frontend usando Node.js, Express e JSON Server (mock API).
- **Frontend**: Aplicação React usando Vite.

---

## Tecnologias

- **BFF**: Node.js, Express, JSON Server
- **Frontend**: React, Vite

---

## Como rodar o projeto

### 1. Instalar dependências

Execute o comando abaixo nas duas pastas do projeto (`bff` e `frontend`):

```bash
npm install
```

---

### 2. Rodar o BFF (mock + servidor express)

Navegue até a pasta `bff`:

```bash
cd bff
```

Execute os comandos para rodar o mock server e o backend:

```bash
npm run mock
npm run dev
```

Após rodar o BFF, a documentação da API via Swagger estará disponível em:

```
http://localhost:3000/api-docs/#/
```

---

### 3. Rodar o frontend

Navegue até a pasta `frontend`:

```bash
cd frontend
```

Execute o comando para rodar a aplicação React:

```bash
npm run dev
```

---

## Como rodar os testes

Para rodar os testes, execute o seguinte comando nas pastas `bff` e `frontend` separadamente:

```bash
npm run test
```

---

## Observações

- O mock server no BFF serve para simular APIs e facilitar o desenvolvimento frontend.
- A aplicação React consome as APIs fornecidas pelo BFF.
- A documentação Swagger ajuda a visualizar e testar as rotas da API do BFF.
