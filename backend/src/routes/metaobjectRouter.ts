import express from 'express';
import { MetaobjectController } from '../controllers';
import { MetaobjectService } from '../services';

export class MetaobjectRouter {
  private readonly router: express.Router;
  private readonly metaobjectController: MetaobjectController;

  constructor() {
    this.router = express.Router();
    this.metaobjectController = new MetaobjectController(new MetaobjectService());
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route('/')
      .get(this.metaobjectController.getAllMetaobject)
      .post(this.metaobjectController.createMetaobject);

    this.router
      .route('/:id')
      .get(this.metaobjectController.getSingleMetaobject)
      .patch(this.metaobjectController.updateMetaobject)
      .delete(this.metaobjectController.deleteMetaobject);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}