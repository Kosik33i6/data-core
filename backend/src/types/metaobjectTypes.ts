import { Types } from 'mongoose';
import { TaskInterface } from './taskTypes';

export interface MetaobjectField {
  key: string;
  value: unknown;
}

export interface MetaobjectInterface extends Document {
  handle: string;
  type: string;
  fields: MetaobjectField[];
  status: 'active' | 'draft';
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  task?: Types.ObjectId;
  metaobjectDefinition: Types.ObjectId;
}

export interface MetaobjectsResult {
  metaobjects: MetaobjectInterface[];
  count: number;
}

export interface DeleteMetaobjectsResult {
  metaobject: MetaobjectInterface;
  message: string;
}
