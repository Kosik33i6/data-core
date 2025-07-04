import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RegisterUserData } from '../types';
import { AuthService } from '../services';
import { attachCookiesToResponse } from '../utils';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password }: RegisterUserData = req.body;
    const user = await this.authService.registerUser({ name, email, password });
    attachCookiesToResponse(res, user);
    res.status(StatusCodes.CREATED).json(user);
  };

  public loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.authService.loginUser({ email, password });
    attachCookiesToResponse(res, user);
    res.status(StatusCodes.OK).json(user);
  };

  public logoutUser = async (req: Request, res: Response) => {
    await this.authService.logoutUser(res);
    res.status(StatusCodes.OK).json({ message: 'Successfully logged out. See you soon!' });
  };
}