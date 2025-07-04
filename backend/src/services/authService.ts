import { Response } from 'express';
import { User } from '../models';
import { BadRequestError, UnauthenticatedError } from '../errors';
import {
  RegisterUserData,
  LoginUserData,
  UserRole,
  TokenUser,
  UserDocument,
} from '../types';
import { createTokenUser, clearAuthCookies } from '../utils';

export class AuthService {
  public async registerUser(userData: RegisterUserData): Promise<TokenUser> {
    const isFirstAccount = await User.countDocuments({}) === 0;
    const role: UserRole = isFirstAccount ? 'admin' : 'user';
    const user: UserDocument = await User.create({ ...userData, role });
    return createTokenUser(user);
  }

  public async loginUser(userData: LoginUserData): Promise<TokenUser> {
    const { email, password } = userData;

    if (!email || !password) {
      throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials');
    }
    return createTokenUser(user);
  }

  public async logoutUser(res: Response) {
    clearAuthCookies(res);
  }
}