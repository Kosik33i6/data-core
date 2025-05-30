import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MetaobjectService } from '../services';

export class MetaobjectController {
  private metaobjectService: MetaobjectService;

  constructor(metaobjectService: MetaobjectService) {
    this.metaobjectService = metaobjectService;
  }

  public createMetaobject = async (req: Request, res: Response): Promise<void> => {
    const metaobject = await this.metaobjectService.createMetaobject(req.body);
    res.status(StatusCodes.CREATED).json(metaobject);
  };

  public getAllMetaobject = async (req: Request, res: Response): Promise<void> => {
    const metaobject = await this.metaobjectService.getAllMetaobject();
    res.status(StatusCodes.OK).json(metaobject);
  };

  public getSingleMetaobject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const metaobject = await this.metaobjectService.getSingleMetaobject(id);
    res.status(StatusCodes.OK).json(metaobject);
  };

  public updateMetaobject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedMetaobject = await this.metaobjectService.updateMetaobject(id, req.body);
    res.status(StatusCodes.OK).json(updatedMetaobject);
  };

  public deleteMetaobject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedMetaobject = await this.metaobjectService.deleteMetaobject(id);
    res.status(StatusCodes.OK).json(deletedMetaobject);
  };
}
