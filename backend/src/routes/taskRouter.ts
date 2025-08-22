import express from 'express';
import { TaskController } from '../controllers';
import { TaskService } from '../services';

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
      .get(this.taskController.getAllTasks)
      .post(this.taskController.createTask);

    this.router
      .route('/:id')
      .get(this.taskController.getSingleTask)
      .patch(this.taskController.updateTask)
      .delete(this.taskController.deleteTask);

    this.router.route('/uploadImage').post(this.taskController.uploadImage);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
