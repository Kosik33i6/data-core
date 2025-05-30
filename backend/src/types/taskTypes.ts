import { Document } from 'mongoose';

export interface TaskInterface extends Document {
  name: string;
  description: string;
  image: string;
  repositoryLink: string;
}