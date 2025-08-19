import express from 'express';
import { UserService } from '../services';
import { UserController } from '../controllers';
import { authenticateUser } from '../middleware';

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
      .get(authenticateUser, this.userController.getAllUsers)
      .post(authenticateUser, this.userController.createUser)
      .delete(authenticateUser, this.userController.deleteAllUsers);

    this.router
      .route('/me')
      .get(authenticateUser, this.userController.showCurrentUser)
      .patch(authenticateUser, this.userController.updateUser)
      .delete(authenticateUser, this.userController.deleteCurrentUser);

    this.router
      .route('/me/password')
      .patch(authenticateUser, this.userController.updateUserPassword);

    this.router
      .route('/:id')
      .get(authenticateUser, this.userController.getSingleUser)
      .delete(authenticateUser, this.userController.deleteUser);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
