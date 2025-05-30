import { NotFoundError } from '../errors';
import { MetaobjectDefinition } from '../models';
import { MetaobjectDefinitionInterface } from '../types';

export class MetaobjectDefinitionService {

  public async createMetaobjectDefinition(metaobjectDefinitionData: MetaobjectDefinitionInterface) {
    const metaobjectDefinition = await MetaobjectDefinition.create(metaobjectDefinitionData);
    return { metaobjectDefinition };
  }

  public async getAllMetaobjectDefinitions() {
    const metaobjectDefinitions = await MetaobjectDefinition.find({});
    return { metaobjectDefinitions, count: metaobjectDefinitions.length };
  }

  public async getSingleMetaobjectDefinition(id: string) {
    const metaobjectDefinition = await MetaobjectDefinition.findById(id).populate('metaobjects');
    if (!metaobjectDefinition) {
      throw new NotFoundError({
        message: 'Metaobject definition not found',
      });
    }

    return { metaobjectDefinition };
  }

  public async updateMetaobjectDefinition(
    id: string,
    metaobjectDefinitionData: MetaobjectDefinitionInterface,
  ) {
    const metaobjectDefinition = await MetaobjectDefinition.findByIdAndUpdate(id, metaobjectDefinitionData, {
      runValidators: true,
      new: true,
    });
    if (!metaobjectDefinition) {
      throw new NotFoundError({ message: 'Metaobject Definition not found' });
    }
    return { metaobjectDefinition };
  }

  public async deleteMetaobjectDefinition(id: string) {
    const metaobjectDefinition = await MetaobjectDefinition.findByIdAndDelete(id);
    if (!metaobjectDefinition) {
      throw new NotFoundError({ message: 'Metaobject Definition not found' });
    }
    return { message: 'Metaobject Definition was removed' };
  }
}