import { Request } from 'express';
import { NotFoundError, UnauthenticatedError } from '../errors';
import { MetaobjectDefinition } from '../models';
import { checkPermissions } from '../utils';
import {
  MetaobjectDefinitionInterface,
  MetaobjectsDefinitionResult,
  DeleteMetaobjectsDefinitionResult,
} from '../types';

export class MetaobjectDefinitionService {
  public createMetaobjectDefinition = async (req: Request): Promise<MetaobjectDefinitionInterface> => {
    const metaobjectDefinitionData: MetaobjectDefinitionInterface = {
      ...req.body,
      user: req.user.id,
    };
    const metaobjectDefinition = await MetaobjectDefinition.create(metaobjectDefinitionData);
    return metaobjectDefinition;
  };

  public getAllMetaobjectsDefinition = async (req: Request): Promise<MetaobjectsDefinitionResult> => {
    const metaobjectsDefinition = await MetaobjectDefinition.find({
      user: req.user.id,
    });
    return { metaobjectsDefinition, count: metaobjectsDefinition.length };
  };

  public getSingleMetaobjectDefinition = async (req: Request): Promise<MetaobjectDefinitionInterface> => {
    const { id } = req.params;
    const metaobjectDefinition = await MetaobjectDefinition.findById(id).populate('metaobjects');
    if (!metaobjectDefinition) {
      throw new NotFoundError('Metaobject definition not found');
    }
    checkPermissions(req.user.id, metaobjectDefinition.user);
    return metaobjectDefinition;
  };

  public updateMetaobjectDefinition = async (req: Request): Promise<MetaobjectDefinitionInterface> => {
    const { id } = req.params;
    const metaobjectDefinition = await MetaobjectDefinition.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!metaobjectDefinition) {
      throw new NotFoundError('Metaobject Definition not found');
    }
    checkPermissions(req.user.id, metaobjectDefinition.user);
    return metaobjectDefinition;
  };

  public deleteMetaobjectDefinition = async (req: Request): Promise<DeleteMetaobjectsDefinitionResult> => {
    const { id } = req.params;
    const metaobjectDefinition = await MetaobjectDefinition.findByIdAndDelete(id);
    if (!metaobjectDefinition) {
      throw new NotFoundError('Metaobject Definition not found');
    }
    checkPermissions(req.user.id, metaobjectDefinition.user);
    return {
      message: 'Metaobject Definition was removed',
      metaobjectDefinition,
    };
  };
}
