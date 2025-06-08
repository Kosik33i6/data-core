import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';
import { UserService } from '../services';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public createUser = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.createUser(req.body);
    res.status(StatusCodes.CREATED).json(user);
  };

  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await this.userService.getAllUsers();
    res.status(StatusCodes.OK).json(users);
  };

  public getSingleUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await this.userService.getSingleUser(id);
    res.status(StatusCodes.OK).json(user);
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedUser = await this.userService.updateUser(id, req.body);
    res.status(StatusCodes.OK).json(updatedUser);
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedUser = await this.userService.deleteUser(id);
    res.status(StatusCodes.OK).json(deletedUser);
  };
}