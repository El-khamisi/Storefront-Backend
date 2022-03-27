import supertest from 'supertest';
import { product } from '../models/product';
import app from '../server';


const req = supertest(app);

describe('Test endpoints responses', () => {

  let ghostUser: string;

  it('create a new user', async ()=>{
    
    const response = await req.post('/signup')
    .send({firstName: 'Mohammed', lasName: '5amisi',username: 'cupcake', password: '1234'})
    .set('Accept', 'application/json')

    ghostUser = response.body.token;
    expect(response.status).toEqual(200);
  })

  it('Show all users', async () => {
    const response = await req.get(`/users`)
      .set('authorization', `Bearer ${ghostUser}`)


    expect(response.status).toEqual(200);

  });
  it('Show A One User', async () => {
   
    const response = await req.get(`/user/1`)
      .set('authorization', `Bearer ${ghostUser}`)

    expect(response.body.id).toBe(1)
    expect(response.status).toEqual(200);
  });

  it('Login an existing User', async () => {
   
    const response = await req.post(`/login`)
      .send({username: 'cupcake', password: '1234'});

    expect(response.status).toEqual(200);
  });

  


  let mockProduct: product;
  it('create a new product', async () => {
   
    const response  = await req.post(`/products`)
      .set('authorization', `Bearer ${ghostUser}`)
      .set('Accept', 'application/json')
      .send({name: 'product1', price: '100'})

      expect(response.body.name).toBe('product1')
      expect(response.status).toEqual(200);
      mockProduct = response.body;
  });

  it('Show A One product', async () => {
   
    const response = await req.get(`/product/${mockProduct.id}`);
    expect(response.body.id).toBe(mockProduct.id)
    expect(response.status).toEqual(200);
  });

  it('Show all products', async () => {
    const response = await req.get(`/products`);
    // console.log(response.body)
    expect(response.status).toEqual(200);
  });



  it('Show all Orders', async () => {
    const response = await req.get(`/orders`);
    // console.log(response.body)
    expect(response.status).toEqual(200);
  });

  it('create a new order', async () => {
   
    const response  = await req.post(`/orders`)
      .set('authorization', `Bearer ${ghostUser}`)
      .set('Accept', 'application/json')
      .send({ product_id: '1',
        qnt_product: '20',
        user_id: '1',
        curr_status: 'active'});

      expect(response.body.product_id).toBe('1')
      expect(response.status).toEqual(200);
  });
  
  it('Current Order by user ', async () => {
   
    const response  = await req.get(`/orders/1`)
      .set('authorization', `Bearer ${ghostUser}`)

      expect(response.body[0].user_id).toBe('1')
      expect(response.status).toEqual(200);
  });
  
  


});