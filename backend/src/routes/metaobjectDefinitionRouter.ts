import express from 'express';
import { MetaobjectDefinitionController } from '../controllers';
import { MetaobjectDefinitionService } from '../services';
import { authenticateUser } from '../middleware';

export class MetaobjectDefinitionRouter {
  private readonly router: express.Router;
  private readonly metaobjectDefinitionController: MetaobjectDefinitionController;

  constructor() {
    this.router = express.Router();
    this.metaobjectDefinitionController = new MetaobjectDefinitionController(new MetaobjectDefinitionService());
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route('/')
      .get(authenticateUser, this.metaobjectDefinitionController.getAllMetaobjectsDefinition)
      .post(authenticateUser, this.metaobjectDefinitionController.createMetaobjectDefinition);

    this.router
      .route('/:id')
      .get(authenticateUser, this.metaobjectDefinitionController.getSingleMetaobjectDefinition)
      .patch(authenticateUser, this.metaobjectDefinitionController.updateMetaobjectDefinition)
      .delete(authenticateUser, this.metaobjectDefinitionController.deleteMetaobjectDefinition);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
