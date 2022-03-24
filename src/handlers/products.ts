import express, { Request, Response } from 'express'
import { product, productSection } from '../models/product'

const section = new productSection()

const index = async (_req: Request, res: Response) => {
  const response = await section.index()
  res.json(response)
}

const show = async (req: Request, res: Response) => {
   const response = await section.show(req.body.id)
   res.json(response)
}

const create = async (req: Request, res: Response) => {
    try {
        const product: product = {
            name: req.body.name,
            price: req.body.price,
        }

        const saved = await section.create(product)
        res.json(saved)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}


const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
}

export default productRoutes