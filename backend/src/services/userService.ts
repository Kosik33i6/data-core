import { UserInterface } from '../types';
import { User } from '../models';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../errors';

export class UserService {
  public async createUser(userData: UserInterface) {
    const user = await User.create(userData);
    return { user };
  }

  public async getAllUsers() {
    const users = await User.find({});
    return { users, count: users.length };
  }

  public async getSingleUser(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return { user };
  }

  public async updateUser(id: string, userData: UserInterface) {
    const user = await User.findByIdAndUpdate(id, userData, {
      runValidators: true,
      new: true,
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return { user };
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

  public async deleteAllUsers() {
    const users = await User.deleteMany({});
    return { message: 'Users were removed', users };
  }
}
