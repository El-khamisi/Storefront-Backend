import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

//Routes
import productRoutes from './handlers/products';
import userRoutes from './handlers/user';
import orderRoutes from './handlers/orders';

const app: express.Application = express();
const port = process.env.PORT || 5050;

app.use(bodyParser.json());

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`starting app on port: ${port}`);
});

export default app;
