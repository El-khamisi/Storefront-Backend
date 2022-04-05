import express, { Request, Response } from 'express';
import { product, productSection } from '../models/product';
import authN from '../middleware/authN';

const section = new productSection();

const index = async (_req: Request, res: Response) => {
  try {
    const response = await section.index();
    res.json(response);
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ e: err.message });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const response = await section.show(req.params.id);
    res.json(response);
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ e: err.message });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: product = {
      name: req.body.name,
      price: req.body.price,
    };

    const saved = await section.create(product);
    res.json(saved);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ e: err.message });
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/product/:id', show);
  app.post('/products', authN, create);
};

export default productRoutes;
