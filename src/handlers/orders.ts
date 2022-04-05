import express, { Request, Response } from 'express';
import { order, orderSection } from '../models/order';
import authN from '../middleware/authN';

const section = new orderSection();

const index = async (_req: Request, res: Response) => {
  try {
    const response = await section.index();
    res.json(response);
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ e: err.message });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: order = {
      user_id: req.body.user_id,
      curr_status: req.body.curr_status,
    };

    const saved = await section.create(order);
    res.json(saved);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ e: err.message });
  }
};

const userOrder = async (req: Request, res: Response) => {
  try {
    const response = await section.showUserOrder(req.params.userID);
    res.json(response);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ e: err.message });
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const productId: string = _req.body.productId;
  const orderId: string = _req.params.id;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await section.addProduct(productId, orderId, quantity);

    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', authN, index);
  app.post('/orders', authN, create);
  app.get('/order/:userID', authN, userOrder);
  app.post('/order/:id/products', authN, addProduct);
};

export default orderRoutes;
