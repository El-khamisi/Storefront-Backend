// @ts-ignore
import Client from '../database';

export enum status {
  active = 'active',
  complete = 'complete',
}

export type order = {
  id?: number;
  user_id: string;
  curr_status: status;
};
export type order_product = {
  id?: number,
  product_id: string,
  order_id: string,
  qnt_product: number
}

export class orderSection {
  async index(): Promise<order[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async create(obj: order): Promise<order> {
    try {
      const sql = 'INSERT INTO orders (user_id, curr_status) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [obj.user_id, obj.curr_status]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async showUserOrder(userId: string): Promise<order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders for user ${userId}. Error: ${err}`);
    }
  }

  async addProduct(productId: string, orderId: string, qnt_product: number): Promise<order_product> {
    try {
      const sql = 'INSERT INTO order_products (product_id, order_id, qnt_product) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [productId, orderId, qnt_product]);

      const order = result.rows[0];
      //   console.log(order);
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
    }
  }
}
