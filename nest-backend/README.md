## Description

## Before start

Make sure you have software mentioned below on your computer:

* ***NPM*** and ***NODE JS***
  https://nodejs.org/en/download/
* ***Docker***
  https://www.docker.com/products/docker-desktop

## Installation

From terminal

```shell
#install dependencies
npm install

# copy file and set proper data inside
cp .env.example .env

cp .env.example .env.test

#docker setup
docker-compose up -d 
```

## Documentation

### Backend code docs

To see project documentation run

```shell
npm run docs
```

and open

[http://127.0.0.1:8080](http://127.0.0.1:8080) in browser

### Swagger (only for rest api)

To see Swagger(OpenApi):

```shell
  npm run dev
```

And open
[http://localhost:3000/docs#/](http://localhost:3000/docs#/)

### PlayGround (only GraphQL)

```shell
npm run dev 
```

open ``` http://localhost:3000/graphql ```

### Database docs

#### Docs

```shell
npm run docs:db
#or 
npx prisma-docs-generator serve
```

It uses random port - see terminal

#### ERD of database

ERD graph of database is in : ```prisma/ERD.png```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run prod
```

Open [http://localhost:3000](http://localhost:3000) in browser

## Migrations and Seeders

### Migrations

You don't have to write migrations by yourself - the only thing you have to do is to write schemix-models. Models are in
dir : ```prisma/models```, and are normal Typescript files.

Steps:

- you write models in typescript (not Prisma language)
- create prisma file (prisma/schema.prisma) with migrations according to model

```shell
# Create new migration (it creates new prisma/schema.prisma)
npm run make:migration 
```

//todo - fix it somehow - it makes docs for database

- open ```prisma/schema.prisma```, and on top of file add line :

```
# it can be missing
generator docs {
  provider = "node node_modules/prisma-docs-generator"
}

generator erd {
  provider = "prisma-erd-generator"
  output = "../prisma/ERD.png"
}

```

- create new sql migrations according

```shell
# Run Migration for Development:
npm run migrate:dev
#or 
npx prisma migrate dev

```

- prisma creates SQL files with migrations, they are sql files, in ```prisma/migrations/```

Look [schemix](https://github.com/ridafkih/schemix) to learn more.

- refresh ORM (types, docs, ide support )

```shell
 npx prisma generate
```

### Seeders

```shell
npm run seed
```

Seeders are in

```shell
# Factories
src/apps/Model_name/factories

# main seed file
src/db/seeds
```

## Test

```shell
# Before first run
docker-compose --env-file .env.test  up -d
```

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


