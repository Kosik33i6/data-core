import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MetaobjectDefinitionService } from '../services';

export class MetaobjectDefinitionController {
  private metaobjectDefinitionService: MetaobjectDefinitionService;

  constructor(metaobjectDefinitionService: MetaobjectDefinitionService) {
    this.metaobjectDefinitionService = metaobjectDefinitionService;
  }

  public createMetaobjectDefinition = async (req: Request, res: Response): Promise<void> => {
    const metaobjectDefinition = await this.metaobjectDefinitionService.createMetaobjectDefinition(req);
    res.status(StatusCodes.CREATED).json(metaobjectDefinition);
  };

  public getAllMetaobjectsDefinition = async (req: Request, res: Response): Promise<void> => {
    const metaobjectDefinitions = await this.metaobjectDefinitionService.getAllMetaobjectsDefinition(req);
    res.status(StatusCodes.OK).json(metaobjectDefinitions);
  };

  public getSingleMetaobjectDefinition = async (req: Request, res: Response): Promise<void> => {
    const metaobjectDefinition = await this.metaobjectDefinitionService.getSingleMetaobjectDefinition(req);
    res.status(StatusCodes.OK).json(metaobjectDefinition);
  };

  public updateMetaobjectDefinition = async (req: Request, res: Response): Promise<void> => {
    const updatedMetaobjectDefinition = await this.metaobjectDefinitionService.updateMetaobjectDefinition(req);
    res.status(StatusCodes.OK).json(updatedMetaobjectDefinition);
  };

  public deleteMetaobjectDefinition = async (req: Request, res: Response): Promise<void> => {
    const deletedMetaobjectDefinition = await this.metaobjectDefinitionService.deleteMetaobjectDefinition(req);
    res.status(StatusCodes.OK).json(deletedMetaobjectDefinition);
  };
}
