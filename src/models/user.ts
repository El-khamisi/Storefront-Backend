// @ts-ignore
import Client from "../database";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const pepper = process.env.PEPPER;
const saltrounds: string = <string>process.env.SALT_ROUNDS 

export type user = {
    id?: number;
    firstName: string;
    lastName: number;
    password: string;
}

export class userSection{
    async index(): Promise<user[]>{
        try{
            //@ts-ignore
            const conn = await  Client.connect();
            const sql = 'SELECT * FROM users';

            const result = await conn.query(sql)

            conn.release()

            return result.rows ;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }
  

    async show(id: string): Promise<user> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

  async create(obj: user): Promise<user> {
      try {
    const sql = 'INSERT INTO products (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const hashed = bcrypt.hashSync(obj.password+pepper,
        parseInt(saltrounds));

    const result = await conn
        .query(sql, [obj.firstName, obj.lastName, hashed])

    const book = result.rows[0]

    conn.release()

    return book
      } catch (err) {
          throw new Error(`Could not add new user ${obj.firstName} ${obj.lastName}. Error: ${err}`)
      }
  }

  async authenticate(username: string, password: string): Promise<user | null> {
    const sql = 'SELECT password FROM users WHERE username=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [username])

    console.log(password+pepper)

    if(result.rows.length) {

      const user = result.rows[0]

      console.log(user)

      if (bcrypt.compareSync(password+pepper, user.password)) {
        return user
      }
    }

    return null
  }
     
}