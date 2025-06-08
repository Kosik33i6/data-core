import path from 'path';
import { MAX_IMAGE_SIZE, UPLOADS_DIR } from '../config';
import { Task } from '../models';
import { NotFoundError, BadRequestError } from '../errors';
import { UploadedFile } from 'express-fileupload';
import { TaskInterface } from '../types';

export class TaskService {

  public async createTask(taskData: TaskInterface) {
    const task = await Task.create(taskData);
    return { task };
  }

  public async getAllTasks() {
    const tasks = await Task.find({});
    return { tasks, count: tasks.length };
  }

  public async getSingleTask(id: string) {
    const task = await Task.findById(id).populate('metaobjects');
    if (!task) {
      throw new NotFoundError({ message: 'Task not found' });
    }
    return { task };
  }

  public async updateTask(id: string, taskData: TaskInterface) {
    const task = await Task.findByIdAndUpdate(id, taskData, {
      runValidators: true,
      new: true,
    });
    if (!task) {
      throw new NotFoundError({ message: 'Task not found' });
    }
    return { task };
  }

  public async deleteTask(id: string) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new NotFoundError({ message: 'Task not found' });
    }
    return { message: 'Task was removed', task };
  }

  public async uploadImage(file: UploadedFile | UploadedFile[]) {
    if (!file) {
      throw new BadRequestError({ message: 'No files uploaded' });
    }

    if (Array.isArray(file)) {
      throw new BadRequestError({ message: 'Multiple files uploaded. Expected only one image.' });
    }

    await this.validateImage(file);
    await this.saveImage(file);

    return { message: 'Image uploaded successfully' };
  }

  private async validateImage(image: UploadedFile) {
    if (!image.mimetype.startsWith('image')) {
      throw new BadRequestError({ message: 'Invalid file format for image' });
    }

    if (image.size > MAX_IMAGE_SIZE) {
      throw new BadRequestError({ message: 'Image is too big' });
    }
  }

  private async saveImage(image: UploadedFile) {
    const imagePath = path.join(__dirname, UPLOADS_DIR, image.name);
    await image.mv(imagePath);
  }
}