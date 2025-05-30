import express from 'express';
import { MetaobjectDefinitionController } from '../controllers';
import { MetaobjectDefinitionService } from '../services';

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
      .get(this.metaobjectDefinitionController.getAllMetaobjectDefinitions)
      .post(this.metaobjectDefinitionController.createMetaobjectDefinition);

    this.router
      .route('/:id')
      .get(this.metaobjectDefinitionController.getSingleMetaobjectDefinition)
      .patch(this.metaobjectDefinitionController.updateMetaobjectDefinition)
      .delete(this.metaobjectDefinitionController.deleteMetaobjectDefinition);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}