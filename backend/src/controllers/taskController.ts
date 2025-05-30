import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';
import { TaskService } from '../services';

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  public createTask = async (req: Request, res: Response): Promise<void> => {
    const task = await this.taskService.createTask(req.body);
    res.status(StatusCodes.CREATED).json(task);
  };

  public getAllTasks = async (req: Request, res: Response): Promise<void> => {
    const tasks = await this.taskService.getAllTasks();
    res.status(StatusCodes.OK).json(tasks);
  };

  public getSingleTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const task = await this.taskService.getSingleTask(id);
    res.status(StatusCodes.OK).json(task);
  };

  public updateTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedTask = await this.taskService.updateTask(id, req.body);
    res.status(StatusCodes.OK).json(updatedTask);
  };

  public deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedTask = await this.taskService.deleteTask(id);
    res.status(StatusCodes.OK).json(deletedTask);
  };

  public uploadImage = async (req: Request, res: Response): Promise<void> => {
    if (!req.files) {
      throw new BadRequestError({
        message: 'No files uploaded',
      });
    }
    const image = await this.taskService.uploadImage(req.files.image);
    res.status(StatusCodes.CREATED).json(image);
  };
}