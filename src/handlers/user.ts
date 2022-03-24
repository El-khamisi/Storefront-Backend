import express, { Request, Response } from 'express'
import { user, userSection } from '../models/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import authN from '../middleware/authN'

dotenv.config();
const section = new userSection()

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
        const nUser: user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }

        const saved = await section.create(nUser)
        saved.password = '';
        const token = jwt.sign({user: saved}, process.env.TOKEN_SECRET);
        res.json(token)
    } catch(err) {
        res.status(400).json(err)
    }
}

const login = async (req: Request, res: Response)=>{
    try{
        const {username, password} = req.body
        const response = await section.authenticate(username, password)
        const token = jwt.sign({user: response}, process.env.TOKEN_SECRET)
        res.json(token)
    }catch(err){
        res.status(400).json(err)
    }
}

const userRoutes = (app: express.Application) => {
  app.get('/users',authN, index)
  app.get('/users/:id',authN, show)
  app.post('/signup', create)
  app.post('/login', login)
}

export default userRoutes