import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorhandler from './app/middleware/global-error-handler';
import Notfound from './app/middleware/not-found';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173', '*'], credentials: true }));

app.use('/',router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!!');
});

app.use(globalErrorhandler);
app.use(Notfound);

export default app;
