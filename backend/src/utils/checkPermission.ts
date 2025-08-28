import { ObjectId } from 'mongodb';
import { UnauthorizedError } from '../errors';

export const checkPermissions = (
  requestUser: ObjectId,
  resourceUserId: ObjectId,
) => {
  if (requestUser.toString() === resourceUserId.toString()) return;
  throw new UnauthorizedError('Not authorized to access this route');
};
