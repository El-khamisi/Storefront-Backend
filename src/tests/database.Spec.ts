import { user, userSection } from '../models/user';
import { product, productSection } from '../models/product';
import { status, order, orderSection } from '../models/order';

const user = new userSection();
const product = new productSection();
const order = new orderSection();

const nUser: user = {
  firstname: 'Cup',
  lastname: 'cake',
  username: '5amisi',
  password: '1234',
};
const nProduct: product = {
  name: 'new_product',
  price: 50,
};
const nOrder: order = {
  user_id: '1',
  curr_status: status.active,
};

//Users
describe('Testing DATABASE - User functionality', () => {
  it('Create should create new user', async () => {
    const saved = await user.create(nUser);
    expect(saved.firstname).toBe('Cup');
  });

  it('Index should show all user', async () => {
    const response = await user.index();
    expect(response[0].id).toBe(1);
    expect(response).toHaveSize(1);
  });

  it('Show should show one user', async () => {
    const response = await user.show('1');
    expect(response.firstname).toBe('Cup');
  });
});

//Products
describe('Testing DATABASE - Products functionality', () => {
  it('Create should create new product', async () => {
    const saved = await product.create(nProduct);
    expect(saved.name).toBe('new_product');
  });

  it('Index should show all products', async () => {
    const response = await product.index();
    expect(response).toHaveSize(1);
    expect(response[0].id).toBe(1);
  });

  it('Show should show one products', async () => {
    const response = await product.show('1');
    expect(response.name).toBe('new_product');
  });
});

//Orders
describe('Testing DATABASE - Orders functionality', () => {
  it('Create should create new order', async () => {
    const saved = await order.create(nOrder);
    expect(saved.user_id).toBe('1');
  });

  it('Index should show all orders', async () => {
    const response = await order.index();
    expect(response).toHaveSize(1);
    expect(response[0].id).toBe(1);
  });

  it('Show The User orders', async () => {
    const response = await order.showUserOrder('1');
    expect(response[0].user_id).toBe('1');
  });

  it('Add product to user order', async () => {
    const response = await order.addProduct('1', '1', 20);
    expect(response.qnt_product).toBe(20);
  });
});
