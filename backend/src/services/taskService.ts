import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';
import { MAX_IMAGE_SIZE, UPLOADS_DIR } from '../config';
import { Task } from '../models';
import { NotFoundError, BadRequestError } from '../errors';
import { UploadedFile } from 'express-fileupload';
import { checkPermissions } from '../utils';
import { TaskInterface, TasksResult, DeleteTaskResult, Message } from '../types';

export class TaskService {
  public async createTask(req: Request): Promise<TaskInterface> {
    const taskData = { ...req.body, user: req.user.id };
    return await Task.create(taskData);
  }

  public getAllTasks = async (req: Request): Promise<TasksResult> => {
    const tasks = await Task.find({ user: req.user.id });
    return { tasks, count: tasks.length };
  };

  public getSingleTask = async (req: Request): Promise<TaskInterface> => {
    const { id } = req.params;
    const task = await Task.findById(id).populate('metaobjects');
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    checkPermissions(req.user.id, task.user);
    return task;
  };

  public updateTask = async (req: Request): Promise<TaskInterface> => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    checkPermissions(req.user.id, task.user);
    Object.assign(task, req.body);
    await task.save();
    return task;
  };

  public deleteTask = async (req: Request): Promise<DeleteTaskResult> => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    checkPermissions(req.user.id, task.user);
    await task.deleteOne();
    return { task, message: 'Task was removed' };
  };

  public uploadImage = async (file: UploadedFile | UploadedFile[]): Promise<Message> => {
    if (!file) {
      throw new BadRequestError('No files uploaded');
    }

    if (Array.isArray(file)) {
      throw new BadRequestError('Multiple files uploaded. Expected only one image.');
    }

    await this.validateImage(file);
    await this.saveImage(file);

    return { message: 'Image uploaded successfully' };
  };

  private validateImage = async (image: UploadedFile): Promise<void> => {
    if (!image.mimetype.startsWith('image')) {
      throw new BadRequestError('Invalid file format for image');
    }

    if (image.size > MAX_IMAGE_SIZE) {
      throw new BadRequestError('Image is too big');
    }
  };

  private saveImage = async (image: UploadedFile): Promise<void> => {
    const imagePath = path.join(__dirname, UPLOADS_DIR, image.name);
    await image.mv(imagePath);
  };
}
