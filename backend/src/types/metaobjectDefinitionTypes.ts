import { Document, Types } from 'mongoose';
import { TaskInterface } from './taskTypes';

export interface FieldDefinition {
  key: string;
  name: string;
  type:
    | 'single_line_text_field'
    | 'multi_line_text_field'
    | 'rich_text_field'
    | 'number_integer'
    | 'number_decimal'
    | 'date'
    | 'datetime'
    | 'boolean'
    | 'url'
    | 'color'
    | 'product_reference'
    | 'file_reference'
    | 'metaobject_reference';
  required: boolean;
  validations?: any;
}

export interface MetaobjectDefinitionInterface extends Document {
  handle: string;
  name: string;
  description?: string;
  user: Types.ObjectId;
  fields: FieldDefinition[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MetaobjectsDefinitionResult {
  metaobjectsDefinition: MetaobjectDefinitionInterface[];
  count: number;
}

export interface DeleteMetaobjectsDefinitionResult {
  metaobjectDefinition: MetaobjectDefinitionInterface;
  message: string;
}
