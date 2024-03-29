# NODEJS API

## Dependencies

- nodejs: [https://www.nodejs.org/](https://www.nodejs.org/en/)
- expressjs: [https://www.expressjs.com/](https://www.expressjs.com/)
- mongodb: [https://www.mongodb.com/](https://www.mongodb.com/)
- docker: [https://www.docker.com/](https://www.docker.com/)

### Installation

- Install typescript globally `npm install -g typescript`
- Install npm dependencies by running `npm install`
- Update the following configurations and database credentials on `{root}/node-app/src/config/*-config.json`
- Build typescript by running `npm run build:development`
- Get global config by running `npm run generate:config`
- Generate documentation by running `npm run generate:docs`
- Install database mock data by running `npm run seed`

### How to Use

- run `npm start` it will listen to http://localhost:8383
- documentation: http://localhost:8383/documentation

### Testing

- start all test by running `npm run test`
- start typescript linter `npm run lint`

## DOCKER

### Installation

- build `docker-compose build`
- install node `docker exec -ti node npm install`

### How to Use

- run `docker-compose up`
- run `docker-compose start`
