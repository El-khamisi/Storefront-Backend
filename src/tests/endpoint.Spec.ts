import supertest from 'supertest';
import { product } from '../models/product';
import { order } from '../models/order';
import { user, userSection } from '../models/user';
import app from '../server';

const req = supertest(app);

const user = new userSection();
let token: string;
let mockProduct: product;

describe('Test endpoints responses', () => {
  it('create a new user', async () => {
    const response = await req
      .post('/signup')
      .send({
        firstname: 'Mohammed',
        lasname: '5amisi',
        username: 'lollipop',
        password: '1234',
      })
      .set('Accept', 'application/json');

    token = response.body.token;
    expect(response.status).toEqual(200);
  });

  it('Show all users', async () => {
    const response = await req.get(`/users`).set('authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
  });
  it('Show A One User', async () => {
    const response = await req.get(`/user/1`).set('authorization', `Bearer ${token}`);

    expect(response.body.id).toBe(1);
    expect(response.status).toEqual(200);
  });

  it('Login an existing User', async () => {
    const response = await req.post(`/login`).send({ username: 'lollipop', password: '1234' });

    expect(response.status).toEqual(200);
  });
});

//Products Describe
describe('Products handlers', () => {
  it('create a new product', async () => {
    const response = await req.post(`/products`).set('authorization', `Bearer ${token}`).set('Accept', 'application/json').send({ name: 'product1', price: '100' });

    expect(response.body.name).toBe('product1');
    expect(response.status).toEqual(200);
    mockProduct = response.body;
  });

  it('Show A One product', async () => {
    const response = await req.get(`/product/${mockProduct.id}`);
    expect(response.body.id).toBe(mockProduct.id);
    expect(response.status).toEqual(200);
  });

  it('Show all products', async () => {
    const response = await req.get(`/products`);
    expect(response.status).toEqual(200);
  });
});

//Orders Describe
describe('Orders handlers', () => {
  it('Show all Orders', async () => {
    const response = await req.get(`/orders`).set('authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it('create a new order', async () => {
    const response = await req.post(`/orders`).set('authorization', `Bearer ${token}`).set('Accept', 'application/json').send({ user_id: '1', curr_status: 'active' });

    expect(response.body.user_id).toBe('1');
    expect(response.status).toEqual(200);
  });

  it('Current Order by user ', async () => {
    const response = await req.get(`/order/1`).set('authorization', `Bearer ${token}`);

    expect(response.body[0].user_id).toBe('1');
    expect(response.status).toEqual(200);
  });

  it('Add product to order', async () => {
    const response = await req.post(`/order/1/products`).set('authorization', `Bearer ${token}`).send({
      productId: '2',
      quantity: 20,
    });
    expect(response.body.qnt_product).toBe(20);
  });
});
