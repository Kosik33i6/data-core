import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  constructor(message: string, statusCode: number = StatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}