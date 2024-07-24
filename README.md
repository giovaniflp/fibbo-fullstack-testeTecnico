
# Fibbo Desafio Técnico Fullstack - SpringBoot + ReactJs + NextJs + PostgreSQL

Projeto feito para uma vaga de Desenvolvedor Fullstack disponibilizado pela Fibbo.




## Demonstração

![Demonstração](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW5kM3AweDJraHhtNno4M2Ntd2xyYjE4N3o0OTQ1Mzl2NHVjdjZkbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5QK1OU0zcOH8VNwFYC/giphy.gif)
## Rodando localmente

#### Pré Requisito - Possuir o Docker ou Docker Desktop instalado(s) na máquina e que esteja aberto

Clone o projeto

```bash
  git clone https://github.com/giovaniflp/fibbo-fullstack-testeTecnico.git
```

Entre no diretório do backend

```bash
  cd .\fibbo-fullstack-testeTecnico\fibbo-springboot-backend\
```

Inicie o contêiner (Back-end e Banco PostgreSQL)

```bash
  docker-compose up --build
```

#### Abra outro terminal

Entre no diretório do frontend

```bash
  cd .\fibbo-fullstack-testeTecnico\fibbo-reactjs-frontend\
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor do frontend

```bash
  npm run dev
```
## Documentação da API

#### Retorna 6 itens dependendo da página

```http
  GET /api/items/pagination?page=PAGE
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `PAGE` | `Número inteiro` | Retorna 6 itens por página, substituir PAGE pelo número da página. Ex: /pagination?page=0 |

#### Retorna todos os itens

```http
  GET /api/items
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Sem parâmetros`      | `Array de objetos` | Retorna todos os itens salvos no banco de dados |

#### Registra um novo item

```http
  POST /api/items
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `nome, descricao`      | `Objeto` | Registra um item no banco de dados |

Exemplo:
{
    "nome":"Celular",
    "descricao": "sistema android"
}

#### Retorna o item com o ID requisitado

```http
  GET /api/items/ID
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `ID`      | `Número` | Retorna o item de acordo com o Id enviado do front-end. Ex: /api/items/1 |

#### Edita dados de um item

```http
  PATCH /api/items/ID
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `ID, nome, descricao`      | `Número e Objeto` | Edita o item de acordo com o Id e as novas informações enviadas do front-end. Ex: /api/items/1 |

Exemplo:
{
    "nome": "Novo nome"
}

#### Deleta um item

```http
  DELETE /api/items/ID
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `ID`      | `Número` | Apaga um item do banco de dados de acordo com o Id enviado do front-end. Ex: /api/items/4 |

## Funcionalidades

- CRUD completo com a entidade Item
- Feedbacks visuais
- Responsividade para todas as telas

## Diferenciais
- Controle de formulário
- Uso de contêiner com Docker
- Pesquisa de detalhes por ID por pesquisa
- Ordenação crescente e decrescente
- Variáveis de ambiente para segurança
- Paginação para evitar sobrecarga do servidor


## Stack utilizada

**Front-end:** React, Tailwindcss, Shadcn/ui e NextJs

**Back-end:** Java, SpringBoot, PostgreSQL e Docker

