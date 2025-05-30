import { NotFoundError } from '../errors';
import { Metaobject } from '../models';
import { MetaobjectInterface } from '../types';

export class MetaobjectService {

  public async createMetaobject(metaobjectDefinitionData: MetaobjectInterface) {
    const metaobject = await Metaobject.create(metaobjectDefinitionData);
    return { metaobject };
  }

  public async getAllMetaobject() {
    const metaobjects = await Metaobject.find({}).populate({
      path: 'metaobjectDefinition',
      select: 'name handle',
    });
    return { metaobjects, count: metaobjects.length };
  }

  public async getSingleMetaobject(id: string) {
    const metaobject = await Metaobject.findById(id);
    if (!metaobject) {
      throw new NotFoundError({
        message: 'Metaobject not found',
      });
    }

    return { metaobject };
  }

  public async updateMetaobject(
    id: string,
    metaobjectDefinitionData: MetaobjectInterface,
  ) {
    const metaobject = await Metaobject.findByIdAndUpdate(id, metaobjectDefinitionData, {
      runValidators: true,
      new: true,
    });
    if (!metaobject) {
      throw new NotFoundError({ message: 'Metaobject not found' });
    }
    return { metaobject };
  }

  public async deleteMetaobject(id: string) {
    const metaobject = await Metaobject.findByIdAndDelete(id);
    if (!metaobject) {
      throw new NotFoundError({ message: 'Metaobject not found' });
    }
    return { message: 'Metaobject was removed' };
  }
}