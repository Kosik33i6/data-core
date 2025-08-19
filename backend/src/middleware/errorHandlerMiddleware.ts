import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import { MongoServerError } from 'mongodb';
import {
  NotFoundError,
  UnauthorizedError,
  UnauthenticatedError,
} from '../errors';
import { ErrorResponse } from '../types';

export class ErrorHandlerMiddleware {
  public static handle = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
    const errorResponse = this.processError(err);
    res.status(errorResponse.statusCode).json(errorResponse.body);
  };

  private static processError(err: unknown): {
    statusCode: number;
    body: ErrorResponse
  } {
    if (err instanceof Error.ValidationError) {
      return this.handleValidationError(err);
    }

    if (err instanceof NotFoundError) {
      return this.handleNotFoundError(err);
    }

    if (err instanceof MongoServerError && err.code === 11000) {
      return this.handleDuplicateKeyError(err);
    }

    if (err instanceof Error.CastError) {
      return this.handleCastError(err);
    }

    if (err instanceof UnauthorizedError) {
      return this.handleUnauthorizedError(err);
    }

    if (err instanceof UnauthenticatedError) {
      return this.handleUnauthenticatedError(err);
    }

    return this.handleServerError();
  }

  private static handleValidationError(err: Error.ValidationError): {
    statusCode: number;
    body: ErrorResponse
  } {
    const validationErrors = Object.values(err.errors).map(
      (error: Error.ValidatorError | Error.CastError) => error.message,
    );

    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: { errors: validationErrors },
    };
  }

  private static handleNotFoundError(err: NotFoundError): {
    statusCode: number;
    body: ErrorResponse
  } {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: { message: err.message },
    };
  }

  private static handleDuplicateKeyError(err: MongoServerError): {
    statusCode: number;
    body: ErrorResponse
  } {
    const duplicateField = Object.keys(err.errorResponse?.keyValue || {})[0] || 'field';
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: {
        message: `Duplicate value entered for ${ duplicateField } field, please choose another value`,
      },
    };
  }

  private static handleCastError(err: Error.CastError): {
    statusCode: number;
    body: ErrorResponse
  } {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: { message: `No item found with id: ${ err.value }` },
    };
  }

  private static handleUnauthorizedError(err: UnauthorizedError): {
    statusCode: number;
    body: ErrorResponse
  } {
    return {
      statusCode: StatusCodes.FORBIDDEN,
      body: { message: err.message },
    };
  }

  private static handleUnauthenticatedError(err: UnauthenticatedError): {
    statusCode: number;
    body: ErrorResponse
  } {
    return {
      statusCode: StatusCodes.UNAUTHORIZED,
      body: { message: err.message },
    };
  }

  private static handleServerError(): {
    statusCode: number;
    body: ErrorResponse
  } {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: { message: 'Something went wrong, please try again later' },
    };
  }
}