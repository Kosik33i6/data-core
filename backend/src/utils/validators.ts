import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';
import { ConfigurationError } from '../errors';
import { TokenUser } from '../types';

export const isUrl = (value: string) => {
  if (!value) return true;
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  return urlRegex.test(value);
};

export const getJwtSecret = (): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new ConfigurationError('JWT_SECRET environment variable is not defined');
  }
  return jwtSecret;
};

export const getJwtLifetime = () => {
  const jwtLifetime = process.env.JWT_LIFETIME as StringValue;

  if (!jwtLifetime) {
    throw new ConfigurationError('JWT_LIFETIME environment variable is not defined');
  }

  return jwtLifetime;
};

export const isTokenValid = (token: string): TokenUser => {
  return jwt.verify(token, getJwtSecret()) as TokenUser;
};