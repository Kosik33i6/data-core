import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';
import { TokenUser } from '../types';
import { ConfigurationError } from '../errors';

export const createJWT = (payload: TokenUser): string => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtLifetime = process.env.JWT_LIFETIME as StringValue;

  if (!jwtSecret) {
    throw new ConfigurationError('JWT_SECRET environment variable is not defined');
  }
  if (!jwtLifetime) {
    throw new ConfigurationError('JWT_LIFETIME environment variable is not defined');
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtLifetime });
};

export const tokenVerify = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new ConfigurationError('JWT_SECRET environment variable is not defined');
  }
  return jwt.verify(token, jwtSecret);
};