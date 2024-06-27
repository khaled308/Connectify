import http from 'http';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import routes from '@/routes';
import { PORT } from '@/config/constants';
import { connectDB } from '@/config/db';
import startSocketServer from '@/config/setupSocket';
import { IErrorResponse } from './shared/globals/helpers/error-handler';
import logger from '@/config/logger';

const app = express();
const httpServer = new http.Server(app);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(hpp());

routes(app);

app.use((error: IErrorResponse, _req: Request, res: Response, _next: NextFunction) => {
  logger('error').error(error);
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  return res.status(status).json({
    status,
    message
  });
});

httpServer.listen(PORT, () => {
  logger('server').info(`Server running on port ${PORT}`);
  connectDB();
  startSocketServer(httpServer);
});
