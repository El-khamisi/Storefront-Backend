import express, { Request, Response } from 'express'
import { order, orderSection } from '../models/order'
import authN from '../middleware/authN'

const section = new orderSection()

const index = async (_req: Request, res: Response) => {
  const response = await section.index()
  res.json(response)
}


const create = async (req: Request, res: Response) => {
    try {
        const order: order = {
            product_id: req.body.product_id,
            qnt_product: req.body.qnt_product,
            user_id: req.body.user_id,
            curr_status: req.body.curr_status
        }

        const saved = await section.create(order)
        res.json(saved)
    } catch(err) {
        res.status(400).json(err)
    }
}

const getByUser =async (req:Request, res: Response) => {
    try{
        const response = await section.showUserOrders(req.body.userID)
        res.json(response)
    }catch(err){
        res.status(400).json(err)
    }
}


const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.post('/orders',authN, create)
  app.get('/orders/:userID',authN, getByUser)
}

export default orderRoutes