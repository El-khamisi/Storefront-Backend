import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authN = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    //@ts-ignore
    const token: string = authorizationHeader.split(' ')[1];
    //@ts-ignore
    req.user = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ e: 'Access denied, invalid token' });
  }
};

export default authN;
