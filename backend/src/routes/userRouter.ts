import express from 'express';
import { UserService } from '../services';
import { UserController } from '../controllers';
import { authenticateUser, authorizePermissions } from '../middleware';

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
      .get(
        authenticateUser,
        authorizePermissions('admin'),
        this.userController.getAllUsers,
      )
      .post(
        authenticateUser,
        authorizePermissions('admin'),
        this.userController.createUser,
      )
      .delete(
        authenticateUser,
        authorizePermissions('admin'),
        this.userController.deleteAllUsers,
      );

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
      .get(
        authenticateUser,
        authorizePermissions('admin'),
        this.userController.getSingleUser,
      )
      .delete(
        authenticateUser,
        authorizePermissions('admin'),
        this.userController.deleteUser,
      );
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
