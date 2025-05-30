import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MetaobjectDefinitionService } from '../services';

export class MetaobjectDefinitionController {
  private metaobjectDefinitionService: MetaobjectDefinitionService;

  constructor(metaobjectDefinitionService: MetaobjectDefinitionService) {
    this.metaobjectDefinitionService = metaobjectDefinitionService;
  }

  public createMetaobjectDefinition = async (req: Request, res: Response): Promise<void> => {
    const metaobjectDefinition = await this.metaobjectDefinitionService.createMetaobjectDefinition(req.body);
    res.status(StatusCodes.CREATED).json(metaobjectDefinition);
  };

  public getAllMetaobjectDefinitions = async (req: Request, res: Response): Promise<void> => {
    const metaobjectDefinitions = await this.metaobjectDefinitionService.getAllMetaobjectDefinitions();
    res.status(StatusCodes.OK).json(metaobjectDefinitions);
  };

  public getSingleMetaobjectDefinition = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const metaobjectDefinition = await this.metaobjectDefinitionService.getSingleMetaobjectDefinition(id);
    res.status(StatusCodes.OK).json(metaobjectDefinition);
  };

  public updateMetaobjectDefinition = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedMetaobjectDefinition = await this.metaobjectDefinitionService.updateMetaobjectDefinition(id, req.body);
    res.status(StatusCodes.OK).json(updatedMetaobjectDefinition);
  };

  public deleteMetaobjectDefinition = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedMetaobjectDefinition = await this.metaobjectDefinitionService.deleteMetaobjectDefinition(id);
    res.status(StatusCodes.OK).json(deletedMetaobjectDefinition);
  };
}
