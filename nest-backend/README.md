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

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Open [http://localhost:3000](http://localhost:3000) in browser

## Migrations and Seeders

### Migrations

Migrations are in dir : ```src/db/migrations```

```shell
# Create new migration
npm run make:migration  --name=new

# Run Migration for Development:
NODE_ENV=development # or test / production
npm run migrate
```

### Seeders

```shell
npm run seed
```

Seeders are in

```shell
# Factories
src/db/factories
# Seeders
src/db/seeds
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


