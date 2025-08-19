import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export class UnauthenticatedError extends CustomError {
  constructor(message: string, statusCode: number = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
  }
}