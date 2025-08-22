import { Response, NextFunction } from 'express';
import { UnauthenticatedError, UnauthorizedError } from '../errors';
import { isTokenValid } from '../utils';
import { AuthenticatedRequest, UserRole } from '../types';

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.signedCookies.token;
  if (!token)
    throw new UnauthenticatedError(
      'Authentication failed: No token provided. Please log in to access this resource.',
    );

  try {
    const { name, id, role } = isTokenValid(token);
    req.user = { name, id, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError(
      'Authentication failed: Invalid or expired token. Please log in again.',
    );
  }
};

export const authorizePermissions = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthenticatedError('User not authenticated');
    }

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        `Unauthorized access. Required role: ${roles.join(' or ')}.`,
      );
    }

    next();
  };
};
