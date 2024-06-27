import { Application, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

const routes = (app: Application) => {
  app.get('/', (_req, res) => {
    res.send('Hello Server!');
  });

  app.all('*', (req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
  });
};

export default routes;
