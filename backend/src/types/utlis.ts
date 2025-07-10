import { Request } from 'express';
import { TokenUser } from './userTypes';

export interface AuthenticatedRequest extends Request {
  user?: TokenUser;
}