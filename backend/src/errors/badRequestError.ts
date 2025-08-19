import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export class BadRequestError extends CustomError {
  constructor(message: string, statusCode: number = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
  }
}
