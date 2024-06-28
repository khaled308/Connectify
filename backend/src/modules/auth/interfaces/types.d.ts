import { IUser } from './auth.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
