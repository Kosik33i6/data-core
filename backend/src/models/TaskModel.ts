import { Schema, model } from 'mongoose';
import { isUrl } from '../utils';
import { TaskInterface } from '../types';

const TaskSchema = new Schema<TaskInterface>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide a task name'],
    maxLength: [100, 'Name cannot be more than 100'],
    minLength: 3,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please provide a task description'],
    maxLength: [300, 'Description cannot be more than 300'],
    minLength: 3,
  },
  image: {
    type: String,
    default: 'uploads/default.jpg',
  },
  repositoryLink: {
    type: String,
    validate: {
      validator: isUrl,
      message: 'Invalid URL format',
    },
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

TaskSchema.virtual('metaobjects', {
  ref: 'Metaobject',
  localField: '_id',
  foreignField: 'task',
  justOne: false,
});

export const Task = model('Task', TaskSchema);