import { Types } from 'mongoose';

export interface MetaobjectField {
  key: string;
  value: unknown;
}

export interface MetaobjectInterface extends Document {
  handle: string;
  type: string;
  fields: MetaobjectField[];
  status: 'active' | 'draft';
  createdAt: Date;
  updatedAt: Date;
  task?: Types.ObjectId;
  metaobjectDefinition: Types.ObjectId;
}