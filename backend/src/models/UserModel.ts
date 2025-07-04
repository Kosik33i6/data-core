import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';
import { UserDocument } from '../types';
import { genSalt, hash, compare } from 'bcrypt-ts';

const UserSchema = new Schema<UserDocument>({
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
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const salt = await genSalt(12);
  this.password = await hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await compare(candidatePassword, this.password);
};

export const User = model<UserDocument>('User', UserSchema);