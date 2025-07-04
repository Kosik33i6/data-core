import { Response } from 'express';
import { createJWT } from './jwt';
import { TokenUser } from '../types';

export const attachCookiesToResponse = (res: Response, user: TokenUser) => {
  const oneWeek = 1000 * 60 * 24 * 7;
  const token = createJWT(user);
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneWeek),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};