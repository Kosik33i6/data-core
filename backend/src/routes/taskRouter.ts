import express from 'express';
import { TaskController } from '../controllers';
import { TaskService } from '../services';
import { authenticateUser } from '../middleware';

export class TaskRouter {
  private readonly router: express.Router;
  private readonly taskController: TaskController;

  constructor() {
    this.router = express.Router();
    this.taskController = new TaskController(new TaskService());
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route('/')
      .get(authenticateUser, this.taskController.getAllTasks)
      .post(authenticateUser, this.taskController.createTask);

    this.router
      .route('/:id')
      .get(authenticateUser, this.taskController.getSingleTask)
      .patch(authenticateUser, this.taskController.updateTask)
      .delete(authenticateUser, this.taskController.deleteTask);

    this.router
      .route('/uploadImage')
      .post(authenticateUser, this.taskController.uploadImage);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
