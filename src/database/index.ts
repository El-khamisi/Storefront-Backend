import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, ENV } = process.env;
const POSTGRES_PORT: string = <string>process.env.POSTGRES_PORT;
let Client;
console.log(ENV);

if (ENV === 'test') {
  Client = new Pool({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === 'dev') {
  Client = new Pool({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default Client;
