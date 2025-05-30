import { Document } from 'mongoose';

export interface FieldDefinition {
  key: string;
  name: string;
  type: 'single_line_text_field' | 'multi_line_text_field' | 'rich_text_field' | 'number_integer' | 'number_decimal' | 'date' | 'datetime' | 'boolean' | 'url' | 'color' | 'product_reference' | 'file_reference' | 'metaobject_reference';
  required: boolean;
  validations?: any;
}

export interface MetaobjectDefinitionInterface extends Document {
  handle: string;
  name: string;
  description?: string;
  fields: FieldDefinition[];
  createdAt: Date;
  updatedAt: Date;
}