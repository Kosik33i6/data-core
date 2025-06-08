import express from 'express';
import { UserService } from '../services';
import { UserController } from '../controllers';

export class UserRouter {
  private readonly router: express.Router;
  private readonly userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController(new UserService());
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route('/')
      .get(this.userController.getAllUsers)
      .post(this.userController.createUser);

    this.router
      .route('/:id')
      .get(this.userController.getSingleUser)
      .patch(this.userController.updateUser)
      .delete(this.userController.deleteUser);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}