import { StatusCodes } from 'http-status-codes';

export abstract class CustomError extends Error {
  protected statusCode: number;

  protected constructor(message: string, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}