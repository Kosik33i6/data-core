import { Response } from 'express';
import { UserInterface, AuthenticatedRequest } from '../types';
import { User } from '../models';
import {
  NotFoundError,
  UnauthorizedError,
  UnauthenticatedError,
  BadRequestError,
} from '../errors';
import {
  createTokenUser,
  attachCookiesToResponse,
  clearAuthCookies,
} from '../utils';

export class UserService {
  public async createUser(userData: UserInterface) {
    const user = await User.create(userData);
    return { user };
  }

  public async getAllUsers() {
    const users = await User.find({ role: { $ne: 'admin' } }).select(
      '-password',
    );
    return { users, count: users.length };
  }

  public async getSingleUser(id: string) {
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return { user };
  }

  public async showCurrentUser(req: AuthenticatedRequest) {
    return req.user;
  }

  public async updateUser(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      throw new UnauthenticatedError('User not authenticated');
    }
    const { id } = req.user;
    const { email, name } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { email, name },
      {
        runValidators: true,
        new: true,
      },
    );
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse(res, tokenUser);
    return { tokenUser };
  }

  public async updateUserPassword(req: AuthenticatedRequest) {
    if (!req.user) {
      throw new UnauthenticatedError('User not authenticated');
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new BadRequestError(
        'Please provide both your old and new passwords.',
      );
    }
    const { id } = req.user;
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials');
    }

    user.password = newPassword;
    await user.save();
  }

  public async deleteUser(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    if (user.role === 'admin') {
      throw new UnauthorizedError('Admin user cannot be deleted');
    }
    await user.deleteOne();
    return { message: 'User was removed', user };
  }

  public async deleteCurrentUser(
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> {
    if (!req.user) {
      throw new UnauthenticatedError('User not authenticated');
    }
    const { id, role } = req.user;
    if (role === 'admin') {
      throw new UnauthorizedError('Admin user cannot be deleted');
    }
    await User.findByIdAndDelete(id);
    clearAuthCookies(res);
  }

  public async deleteAllUsers() {
    const users = await User.deleteMany({});
    return { message: 'Users were removed', users };
  }
}
