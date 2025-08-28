import { TokenUser } from './userTypes';

declare global {
  namespace Express {
    interface Request {
      user: TokenUser;
    }
  }
}
