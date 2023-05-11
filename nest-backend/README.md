## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


