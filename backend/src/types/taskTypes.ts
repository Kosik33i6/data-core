import { Document, Types } from 'mongoose';

export interface TaskInterface extends Document {
  name: string;
  description: string;
  image: string;
  repositoryLink: string;
  user: Types.ObjectId;
}

export interface TasksResult {
  tasks: TaskInterface[];
  count: number;
}

export interface DeleteTaskResult {
  task: TaskInterface;
  message: string;
}
