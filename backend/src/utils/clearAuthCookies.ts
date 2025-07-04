import { Response } from 'express';

export const clearAuthCookies = (res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};