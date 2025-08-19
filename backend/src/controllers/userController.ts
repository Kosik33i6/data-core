import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../services';
import { AuthenticatedRequest } from '../types';

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

  public showCurrentUser = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    const currentUser = await this.userService.showCurrentUser(req);
    res.status(StatusCodes.OK).json(currentUser);
  };
  public updateUser = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    const updatedUser = await this.userService.updateUser(req, res);
    res.status(StatusCodes.OK).json(updatedUser);
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedUser = await this.userService.deleteUser(id);
    res.status(StatusCodes.OK).json(deletedUser);
  };

  public deleteCurrentUser = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    await this.userService.deleteCurrentUser(req, res);
    res
      .status(StatusCodes.OK)
      .json({ message: 'You have been deleted successfully!' });
  };

  public deleteAllUsers = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const deletedUsers = await this.userService.deleteAllUsers();
    res.status(StatusCodes.OK).json(deletedUsers);
  };

  public updateUserPassword = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    await this.userService.updateUserPassword(req);
    res
      .status(StatusCodes.OK)
      .json({ message: 'User password was updated successfully.' });
  };
}
