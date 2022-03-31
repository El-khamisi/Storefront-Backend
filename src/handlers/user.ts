import express, { Request, Response } from 'express';
import { user, userSection } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authN from '../middleware/authN';

dotenv.config();

const TOKEN_SECRET: string = <string>process.env.TOKEN_SECRET;
const section = new userSection();

const index = async (_req: Request, res: Response) => {
  const response = await section.index();
  res.json(response);
};

const show = async (req: Request, res: Response) => {
  const response = await section.show(req.params.id);
  res.json(response);
};

const create = async (req: Request, res: Response) => {
  try {
    const nUser: user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
    };

    const saved = await section.create(nUser);
    saved.password = '';

    const token = jwt.sign({ user: saved }, TOKEN_SECRET);
    res.json({ token });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ e: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const response = await section.authenticate(username, password);
    const token = jwt.sign({ user: response }, TOKEN_SECRET);
    res.json({ token });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ e: err.message });
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', authN, index);
  app.get('/user/:id', authN, show);
  app.post('/signup', create);
  app.post('/login', login);
};

export default userRoutes;
