import express from 'express';
import { AuthController } from '../controllers';
import { AuthService } from '../services';

export class AuthRouter {
  private readonly router: express.Router;
  private readonly authController: AuthController;

  constructor() {
    this.router = express.Router();
    this.authController = new AuthController(new AuthService());
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.authController.registerUser);
    this.router.post('/login', this.authController.loginUser);
    this.router.get('/logout', this.authController.logoutUser);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}