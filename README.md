# Image-Processing-API

## Description
A backend project( based on node.js and express framework) using `postgres` database to create users, products, and orders that user can access them by endpoints API and doing CRUD on them.
Written in `typescript` enhanced with `jasmine` unit test framework to ensure the websita has less errors rather than `plain js`


### Executing program

* The website worked on `process.env.PORT || 3000` by `nodemon` developer monitoring server
* OR on production mode `node dist/index`
```
nodemon index.js
```

### .env prerequisite
```
POSTGRES_HOST
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD
TOKEN_SECRET        //Secret word of jwt token
PEPPER              //Secret word to Add to passwrod
SALT_ROUNDS         //Number of Salt Rounds in number
```

## Instructions on how to access endpoint