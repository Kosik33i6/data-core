import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../errors';
import mongoose, { Error } from 'mongoose';

export const errorhandlerMiddleware: ErrorRequestHandler = (
  err: Error | mongoose.Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.log('err:', err.code);
  if (err instanceof CustomError) {
    const { statusCode, errors } = err;

    res.status(statusCode).json({ errors });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const validationErrors = Object.values(err.errors).map((error: Error.ValidatorError | Error.CastError) => error.message);

    res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors,
    });
    return;
  }

  if (err.message === 'Duplication handle') {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: err.message,
    });
    return;
  }

  // if (err && err.code)

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal Server Error' });
  return;
};
