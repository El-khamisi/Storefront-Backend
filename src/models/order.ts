// @ts-ignore
import Client from "../database";

enum status {
    active = 'active',
    complete = 'complete'
}

export type order = {
    id?: number;
    product_id: number;
    qnt_product: number;
    user_id: number; 
    curr_status: status;
}

export class orderSection{
    async index(): Promise<order[]>{
        try{
            //@ts-ignore
            const conn = await  Client.connect();
            const sql = 'SELECT * FROM orders';

            const result = await conn.query(sql)

            conn.release()

            return result.rows ;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }
  
    async create(obj: order): Promise<order> {
        try {
      const sql = 'INSERT INTO orders (product_id, qnt_product, user_id, curr_status) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn
          .query(sql, [obj.product_id, obj.qnt_product, obj.user_id, obj.curr_status])
            
      const order = result.rows[0]
  
      conn.release()
  
      return order
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`)
        }
    }

    async showUserOrders(userId: string): Promise<order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [userId])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not find orders for user ${userId}. Error: ${err}`)
        }
    }

     
}