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

To see project documentation run

```shell
npm run docs
```

and open

[http://127.0.0.1:8080](http://127.0.0.1:8080) in browser

To see Swagger(OpenApi):

```shell
  npm run dev
```

And open
[http://localhost:3000/docs#/](http://localhost:3000/docs#/)

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


