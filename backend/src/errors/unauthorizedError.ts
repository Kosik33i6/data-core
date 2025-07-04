import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export class UnauthorizedError extends CustomError {
  constructor(message: string, statusCode: number = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
    this.statusCode = statusCode;
  }
}