import { Schema, model } from 'mongoose';
import { MetaobjectInterface } from '../types';

const MetaobjectSchema = new Schema<MetaobjectInterface>({
  handle: { type: String, required: true, unique: true, index: true },
  type: { type: String, required: true, index: true },
  fields: [{
    key: { type: String, required: true },
    value: { type: Schema.Types.Mixed },
  }],
  status: {
    type: String,
    required: true,
    enum: ['active', 'draft'],
    default: 'draft',
  },
  task: { type: Schema.Types.ObjectId, ref: 'Task' },
  metaobjectDefinition: {
    type: Schema.Types.ObjectId,
    ref: 'MetaobjectDefinition',
    required: true,
  },
}, { timestamps: true });

export const Metaobject = model<MetaobjectInterface>('Metaobject', MetaobjectSchema);