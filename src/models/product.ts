// @ts-ignore
import Client from "../database";

export type product = {
    id?: number;
    name: string;
    price: number;
}

export class productSection{
    async index(): Promise<product[]>{
        try{
            //@ts-ignore
            const conn = await  Client.connect();
            const sql = 'SELECT * FROM products';

            const result = await conn.query(sql)

            conn.release()

            return result.rows ;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }
  

    async show(id: string): Promise<product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

  async create(obj: product): Promise<product> {
      try {
    const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [obj.name, obj.price])

    const book = result.rows[0]

    conn.release()

    return book
      } catch (err) {
          throw new Error(`Could not add new product ${obj.name}. Error: ${err}`)
      }
  }
     
}