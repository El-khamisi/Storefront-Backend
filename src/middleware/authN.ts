import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();


const authN = (req: Request, res: Response)=>{
  try {
    const authorizationHeader = req.headers.authorization
    //@ts-ignore
    const token: string = authorizationHeader.split(' ')[1]
    //@ts-ignore
    req.user = jwt.verify(token, process.env.TOKEN_SECRET)
  } catch(err) {
    res.status(401).json('Access denied, invalid token')
  }
}

export default authN