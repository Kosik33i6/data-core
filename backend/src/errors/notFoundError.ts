import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export class NotFoundError extends CustomError {
  constructor(message: string, statusCode: number = StatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}

/** interface NotFoundErrorInterface extends Error {
 context: { [key: string]: unknown };
 }

 export class NotFoundError extends CustomError {
 private static readonly statusCode = StatusCodes.NOT_FOUND;
 private readonly code: number;
 private readonly context: { [key: string]: any };

 constructor({
 code,
 message,
 context,
 }) {

 super(message || StatusCodes.NOT_FOUND);
 this.code = code || NotFoundError.statusCode;
 this.context = params?.context || {};
 Object.setPrototypeOf(this, NotFoundError.prototype);
 }

 get errors() {
 return [{ message: this.message, context: this.context }];
 }

 get statusCode() {
 return this.code;
 }
 }
 */