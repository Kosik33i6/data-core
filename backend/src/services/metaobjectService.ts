import { Request } from 'express';
import { NotFoundError } from '../errors';
import { Metaobject } from '../models';
import { checkPermissions } from '../utils';
import { MetaobjectInterface, MetaobjectsResult, DeleteMetaobjectsResult } from '../types';

export class MetaobjectService {
  public createMetaobject = async (req: Request): Promise<MetaobjectInterface> => {
    const metaobject: MetaobjectInterface = await Metaobject.create({
      ...req.body,
      user: req.user.id,
    });
    return metaobject;
  };

  public async getAllMetaobject(req: Request): Promise<MetaobjectsResult> {
    const metaobjects: MetaobjectInterface[] = await Metaobject.find({ user: req.user.id }).populate({
      path: 'metaobjectDefinition',
      select: 'name handle',
    });
    return { metaobjects, count: metaobjects.length };
  }

  public getSingleMetaobject = async (req: Request): Promise<MetaobjectInterface> => {
    const { id } = req.params;
    const metaobject = await Metaobject.findById(id);
    if (!metaobject) {
      throw new NotFoundError('Metaobject not found');
    }
    checkPermissions(req.user.id, metaobject.user);
    return metaobject;
  };

  public updateMetaobject = async (req: Request): Promise<MetaobjectInterface> => {
    const { id } = req.params;
    const metaobject = await Metaobject.findById(id);
    if (!metaobject) {
      throw new NotFoundError('Metaobject not found');
    }
    checkPermissions(req.user.id, metaobject.user);
    Object.assign(metaobject, req.body);
    return metaobject;
  };

  public deleteMetaobject = async (req: Request): Promise<DeleteMetaobjectsResult> => {
    const { id } = req.params;
    const metaobject = await Metaobject.findById(id);
    if (!metaobject) {
      throw new NotFoundError('Metaobject not found');
    }
    checkPermissions(req.user.id, metaobject.user);
    return { message: 'Metaobject was removed', metaobject };
  };
}
