import express from 'express';
import { MetaobjectController } from '../controllers';
import { MetaobjectService } from '../services';
import { authenticateUser } from '../middleware';

export class MetaobjectRouter {
  private readonly router: express.Router;
  private readonly metaobjectController: MetaobjectController;

  constructor() {
    this.router = express.Router();
    this.metaobjectController = new MetaobjectController(
      new MetaobjectService(),
    );
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route('/')
      .get(authenticateUser, this.metaobjectController.getAllMetaobject)
      .post(authenticateUser, this.metaobjectController.createMetaobject);

    this.router
      .route('/:id')
      .get(authenticateUser, this.metaobjectController.getSingleMetaobject)
      .patch(authenticateUser, this.metaobjectController.updateMetaobject)
      .delete(authenticateUser, this.metaobjectController.deleteMetaobject);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
