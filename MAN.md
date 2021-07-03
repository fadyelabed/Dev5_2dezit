# Instructions to run

### create database

- create mongo db `https://www.mongodb.com/basics/create-database`

### run application

- copy the `{root}/node-app/src/config/database-config.example.json` and create `database-config.json`

- fill up the database information

- copy the `{root}/backend/node-app/src/app.env.example` and create `app.env`

- fill up the env you want the application to run

- go to `{root}`

- run `docker-compose build`

- run `docker-compose up`

- open the application on `localhost:8383`
