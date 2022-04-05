// @ts-ignore
import Client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const pepper: string = <string>process.env.PEPPER;
const saltrounds: string = <string>process.env.SALT_ROUNDS;

export type user = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

export class userSection {
  async index(): Promise<user[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<user> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(obj: user): Promise<user> {
    try {
      const sql = 'INSERT INTO users (firstName, lastName, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const hashed: string = <string>bcrypt.hashSync(obj.password + pepper, parseInt(saltrounds));

      const result = await conn.query(sql, [obj.firstname, obj.lastname, obj.username, hashed]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${obj.firstname} ${obj.lastname}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<user | Error> {
    try {
      const sql = 'SELECT password FROM users WHERE username=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [username]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        } else {
          throw new Error('Password is invalid');
        }
      }
      throw new Error('Invalid username');
    } catch (err) {
      throw new Error('Can NOT find user');
    }
  }

  async delete(id: string): Promise<user> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
}
