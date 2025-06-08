import { UserInterface } from '../types';
import { User } from '../models';
import { NotFoundError, BadRequestError } from '../errors';

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
      throw new NotFoundError({ message: 'User not found' });
    }
    return { user };
  }

  public async updateUser(id: string, userData: UserInterface) {
    const user = await User.findByIdAndUpdate(id, userData, {
      runValidators: true,
      new: true,
    });
    if (!user) {
      throw new NotFoundError({ message: 'User not found' });
    }
    return { user };
  }

  public async deleteUser(id: string) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundError({ message: 'User not found' });
    }
    return { message: 'User was removed', user };
  }
}
