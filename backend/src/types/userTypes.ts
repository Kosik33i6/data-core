import { Types, HydratedDocument } from 'mongoose';

export type UserRole = 'admin' | 'user';

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type RegisterUserData = Omit<UserInterface, 'role'>;
export type LoginUserData = Omit<UserInterface, 'name' | 'role'>;
export type TokenUser = {
  id: Types.ObjectId;
  name: string
  role: UserRole;
}

export type UserDocument = HydratedDocument<UserInterface> & {
  comparePassword(candidatePassword: string): Promise<boolean>;
}