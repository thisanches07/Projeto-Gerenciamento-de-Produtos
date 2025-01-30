# Gerenciamento de Produtos e Pedidos
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Descrição

Essa API permite o gerenciamento completo de produtos e pedidos, incluindo o controle de estoque e o cálculo automático dos valores de cada pedido com base nos produtos solicitados.

## Pré-requisitos

Antes de rodar a aplicação, é necessário ter os seguintes programas instalados:

- **PostgreSQL**: Para armazenar os dados do projeto.
- **Node.js**: Para rodar a aplicação.
- **Docker** (opcional, caso queira rodar com containers).
  
# Como rodar a API local?
  Para executar o projeto, é necessário ter o PostgreSQL e o Node.js instalados. Siga o passo a passo abaixo para configurá-lo corretamente:
  ### 1. Clonar o repositório
  ```bash
    git clone <url-do-repositorio>
  ```
  ### 2. Instalar dependências
  Instale as dependências necessárias usando o npm:
  ```bash
    npm install
  ```
   ### 3. Configurar o arquivo .env
   Copie o conteúdo do arquivo .env-example e crie um novo arquivo na raiz do projeto chamado .env com o conteúdo copiado. Caso preferir, rode o seguinte comando no terminal (cmd): 
  ```bash
    copy .env-example .env
  ```
  ### 4. Rodar a API
  - Para rodar a API localmente, certifique-se que a variável DB_HOST esteja da seguinte forma: **DB_HOST=localhost**
    Rode o comando:
  ```bash
    npm run start:dev
  ```
A API estará disponível em [http://localhost:3000](http://localhost:3000)

# Como rodar a API pelo Docker?
Se você preferir rodar a aplicação utilizando containers Docker, siga os passos abaixo
 ### 1. Clonar o repositório
  ```bash
    git clone <url-do-repositorio>
  ```
 ### 2. Rodar os containers 
 Para rodar a API via Docker, é necerrário alterar a variável DB_HOST para **DB_HOST=postgres**.
 Rode o comando:
  ```bash
    docker-compose up -d
  ```
Este comando irá:

Criar e iniciar dois containers:
Um para o PostgreSQL.
Um para a aplicação NestJS.
A aplicação estará disponível em [http://localhost:3000](http://localhost:3000) quando os containers estiverem rodando.

## Importante
- Na raiz do projeto, você encontrará um arquivo chamado ```export_de_requisicoes.json```. Esse arquivo pode ser importado em plataformas de desenvolvimento e teste de APIs, como Postman ou Insomnia, para facilitar a interação com as rotas da aplicação.

# Rodar testes
```bash
  npm run test
```

# Swagger
O Swagger da aplicação pode ser acessado em  [http://localhost:3000/api](http://localhost:3000/api)


