<p align="center">
  <img src="https://img.shields.io/badge/node-v18.18.2-339933?style=flat&logo=nodedotjs&logoColor=%23339933" />
  <img src="https://img.shields.io/badge/npm-v9.8.1-CB3837?style=flat&logo=npm" />
  <img src="https://img.shields.io/badge/feito_por-Carlos_Faustino-black" />
</p>

<br/>

# :bulb: Sobre

O **Find a Friend** é um app para encontrar o pet ideal para seu estilo de vida desenvolvido no módulo sobre API REST da formação de Node.js da Rocketseat.

## :page_with_curl: Pré-requisitos

1. Antes de começar, certifique-se de ter o Node.js instalado em sua máquina. 
    <a href="https://nodejs.org">
      <img width="24" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
    </a>

## :gear: Configuração

1. Clone o repositório para sua máquina local:

```bash
git clone https://github.com/carlos-hfc/find-a-friend
```

2. Acesse o diretório do projeto:

```bash
cd find-a-friend
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo `.env.local` na raiz do projeto e adicione as seguinte chaves:

```env
NODE_ENV=""
DATABASE_URL=""
JWT_SECRET=""
```

5. Rode a aplicação

```bash
npm run dev
```

## :computer_mouse: Features

### Requisitos funcionais

- :ballot_box_with_check: Deve ser possível se cadastrar como uma ORG
- :ballot_box_with_check: Deve ser possível realizar login como uma ORG
- :ballot_box_with_check: Deve ser possível cadastrar um pet
- :white_large_square: Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- :white_large_square: Deve ser possível filtrar pets por suas características
- :white_large_square: Deve ser possível visualizar detalhes de um pet para adoção

### Regras de negócio

- :ballot_box_with_check: Uma ORG precisa ter um endereço e um número de WhatsApp
- :ballot_box_with_check: Para um ORG acessar a aplicação como admin, ela precisa estar logada
- :ballot_box_with_check: O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- :ballot_box_with_check: Um pet deve estar ligado a uma ORG
- :white_large_square: Para listar os pets, obrigatoriamente precisamos informar a cidade
- :white_large_square: Todos os filtros, além da cidade, são opcionais

## :computer: Tecnologias utilizadas

<p float="left">
  <img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
  <img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/>
</p>

## :page_facing_up: Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).