import { TokenUser, UserDocument } from '../types';

export const createTokenUser = (user: UserDocument): TokenUser => {
  return { name: user.name, id: user._id, role: user.role };
};