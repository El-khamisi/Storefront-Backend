# Storefront Backend

## Description
A backend project( based on node.js and express framework) using docker image of `postgresql` to spin a database container to create users, products, and orders that users can access by endpoints API and doing CRUD on them.


### Executing program

* The website worked on `process.env.PORT || 3000` by `nodemon` developer monitoring server
* OR on production mode `node dist/index`
```
nodemon index.js
```

### .env prerequisite
```
PORT
ENV                 //can be 'test' OR 'dev'
POSTGRES_HOST
POSTGRES_PORT
POSTGRES_DB
POSTGRES_TEST_DB
POSTGRES_USER
POSTGRES_PASSWORD
TOKEN_SECRET        //Secret word of jwt token
PEPPER              //Secret word to Add to passwrod
SALT_ROUNDS         //Number of Salt Rounds in number
```

## Instructions to setup database
```
CREATE USER el5amisi WITH PASSWORD 'el5amisi';
CREATE DATABASE store;
CREATE DATABASE store_test;
GRANT ALL PRIVILEGES ON DATABASE store TO el5amisi;
GRANT ALL PRIVILEGES ON DATABASE store_test TO el5amisi;
```

## Instructions to run Server
```
Server will RUN on PORT env variable:
const port = process.env.PORT || 5050
```

## npm package.json scripts
npm run -----
```
"clean": "rm -rf dist",
"build": "npx tsc",
"devServer": "nodemon src/server.ts",
"start": "npm run build && node './dist/server.js'",
"jasmine": "jasmine",
"migrate": "db-migrate --env test up && db-migrate up",
"test": "npm run clean &&  db-migrate --env test up &&  npm run build && ENV=test npm run jasmine  && db-migrate --env test reset",
"lint": "eslint . --ext .ts",
"prettier": "prettier --config .prettierrc 'src/**/*.ts' --write"
```
