# API Blogging

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

## Resumo do projeto

Projeto de API REST para um Blogging de Aulas com sistema de cadastro e manejo de usuários, categorias e aulas ministradas.

## Stack utilizada

- `Node.js` v20.13.0
- `express` v4.19.2,
- `chalk` v4.1.2
- `crypto-js` v4.2.0
- `dotenv` v16.4.5
- `dotenv-safe` v9.1.0
- `join` v3.0.0
- `jsonwebtoken` v3.0.0
- `mongoose` v8.5.1
- `openai` v4.80.1

## Instalação

Este projeto já conta com o código necessário para subir a API em um servidor local:

```
├── .github
│   └── workflows
│       ├── pre-push.yaml
│       └── unit-tests-pr.yaml
├── src
│   ├── controllers
│   │   ├── category-controllers.ts
│   │   ├── classroom-controllers.ts
│   │   ├── login-controllers.ts
│   │   ├── openai-controllers.ts
│   │   └── user-controllers.ts
│   ├── domains
│   │   ├── category-domain.ts
│   │   └── classroom-domain.ts
│   ├── errors
│   │   ├── error-base.ts
│   │   ├── error-request.ts
│   │   ├── error-validation.ts
│   │   └── not-found.ts
│   ├── interfaces
│   │   ├── category.ts
│   │   ├── classroom.ts
│   │   ├── login.ts
│   │   ├── params.ts
│   │   └── user.ts
│   ├── middlewares
│   │   ├── error-handler.ts
│   │   ├── logging.ts
│   │   ├── manipulator404.ts
│   │   └── user-authorization.ts
│   ├── mocks
│   │   ├── openai-detail.mock.ts
│   │   ├── openai-resume.mock.ts
│   │   └── openai-test.mock.ts
│   ├── models
│   │   ├── category-model.ts
│   │   ├── classroom-model.ts
│   │   └── user-model.ts
│   ├── routes
│   │   ├── category-routes.ts
│   │   ├── classroom-routes.ts
│   │   ├── login-routes.ts
│   │   └── user-routes.ts
│   ├── services
│   │   ├── category-service.ts
│   │   ├── classroom-service.ts
│   │   ├── openai-service.ts
│   │   └── user-service.ts
│   ├── utils
│   │   ├── create-hash.ts
│   │   ├── create-jwt.ts
│   │   ├── page.ts
│   │   └── valid-user.ts
├── tests
│   │   ├── controllers
│   │   │   ├── category-controller.spec.ts
│   │   │   ├── classroom-controller.spec.ts
│   │   │   ├── login-controller.spec.ts
│   │   │   ├── openai-controller.spec.ts
│   │   │   └── user-controller.spec.ts
│   │   ├── middlewares
│   │   │   └── user-authorization.spec.ts
│   │   ├── models
│   │   │   ├── category-model.spec.ts
│   │   │   ├── classroom-model.spec.ts
│   │   │   └── user-model.spec.ts
│   │   ├── services
│   │   │   ├── category-service.spec.ts
│   │   │   ├── classroom-service.spec.ts
│   │   │   ├── openai-service.spec.ts
│   │   │   └── user-service.spec.ts
│   │   ├── utils
│   │   │   ├── create-jwt.spec.ts
│   │   │   ├── page.spec.ts
│   │   │   └── valid-user.spec.ts
├── .env
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── .eslintrc.mjs
├── jest.config.js
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── server.ts
```

### Instalação do projeto

Este projeto está pronto para ser executado em um ambiente Docker. Por este motivo, será necessária apenas a instalação do Docker, não sendo necessária a instalação manual do projeto via
`npm install`; também não será necessária a instalação manual do banco de dado utilizado (Mongodb).

Caso não tenha o Docker instalado, siga as instruções para seu sistema operacional na [documentação oficial do Docker](https://docs.docker.com/get-docker/).

Para executar em ambiente de desenvolvimento:

- Faça o `fork` e `clone` deste repositório em seu computador;
- Entre no diretório local onde o repositório foi clonado;
- Utilize o comando `sudo docker-compose up` para "build" e subir o servidor local e expor a porta 3000 em `localhost`.

## Como rodar a API

O comando `sudo docker-compose up` já fará o processo de instalar e subir o servidor local da API em modo de desenvolvimento. Você deverá ver no terminal a seguinte mensagem:

```
Starting blogging-express-postech_blogging-mongo_1 ... done
Starting blogging-api                              ... done
Attaching to blogging-express-postech_blogging-mongo_1, blogging-api
blogging-api      |
blogging-api      | > blogging-express-postech@1.0.0 start
blogging-api      | > node dist/server.js
blogging-api      |
blogging-api      | [7/26/2024, 2:20:10 AM] [INFO]  Connected to Blogging.
blogging-api      | [7/26/2024, 2:20:10 AM] [INFO]  Server is running on port 3000.
```

Este projeto utiliza o Nodemon para gerenciar as mudanças na base de código e reiniciar o servidor automaticamente.

> **IMPORTANTE:** Esta API está programada para ser acessada a partir de `http://localhost:3000`. Certifique-se de que não existem outros recursos ocupando a porta `3000` antes de subir o projeto.

### Endpoints

A API expõe os seguintes _endpoints_ a partir da _base URL_ `localhost:3000/blogging`:

`/aigenerate`

- `POST /aigenerate`

`/categories`

- `GET /categories`
- `GET /categories/:id`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

`/classes`

- `GET /classes`
- `GET /classes/search`
- `GET /classes/:id`
- `GET /classes/managerial`
- `POST /classes`
- `PUT /classes/:id`
- `DELETE /classes/:id`

`/users`

- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

`/login`

- `POST /login`

### Banco de Dados

Este projeto utiliza o Mongodb como gerenciador de banco de dados.

## Roadmap

- Autenticação
- Tratamento de erros
- Validações
