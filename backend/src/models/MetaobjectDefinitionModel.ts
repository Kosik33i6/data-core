import { Schema, model } from 'mongoose';
import { MetaobjectDefinitionInterface } from '../types';

const MetaobjectDefinitionSchema = new Schema<MetaobjectDefinitionInterface>(
  {
    handle: {
      type: String,
      required: true,
      unique: [true, 'Duplication handle'],
      index: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    fields: [
      {
        key: { type: String, required: true },
        name: { type: String, required: true },
        type: {
          type: String,
          required: true,
          enum: [
            'single_line_text_field',
            'multi_line_text_field',
            'number_integer',
            'number_decimal',
            'boolean',
            'url',
            'metaobject_reference',
          ],
        },
        required: { type: Boolean, default: false },
        validations: { type: Schema.Types.Mixed },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

MetaobjectDefinitionSchema.virtual('metaobjects', {
  ref: 'Metaobject',
  localField: '_id',
  foreignField: 'metaobjectDefinition',
  justOne: false,
});

MetaobjectDefinitionSchema.pre(
  'deleteMany',
  async function (this: MetaobjectDefinitionInterface) {
    await this.model('Metaobject').deleteMany({
      metaobjectDefinition: this._id,
    });
  },
);

export const MetaobjectDefinition = model<MetaobjectDefinitionInterface>(
  'MetaobjectDefinition',
  MetaobjectDefinitionSchema,
);
