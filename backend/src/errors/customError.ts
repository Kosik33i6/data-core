import { StatusCodes } from 'http-status-codes';

export abstract class CustomError extends Error {
  protected statusCode: number;

  protected constructor(message: string, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

// export type CustomErrorContent = {
//   message: string,
//   context?: { [key: string]: unknown }
// };
//
// export abstract class CustomError extends Error {
//   abstract readonly statusCode: number;
//   abstract readonly errors: CustomErrorContent[];
//
//   protected constructor(message: string) {
//     super(message);
//     Object.setPrototypeOf(this, CustomError.prototype);
//   }
// }