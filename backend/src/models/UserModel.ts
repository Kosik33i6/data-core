import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';
import { UserInterface } from '../types';

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    trim: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 50,
    validate: {
      validator: function (value: string) {
        return isEmail(value);
      },
      message: 'Please enter a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    trim: true,
    minLength: 6,
    maxLength: 50,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

export const User = model<UserInterface>('User', UserSchema);