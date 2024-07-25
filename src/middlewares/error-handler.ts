import mongoose from 'mongoose';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import ErrorBaser from '../errors/error-base';
import ErrorRequest from '../errors/error-request';
import ValidationError from '../errors/error-validation';

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof mongoose.Error.CastError) {
    new ErrorRequest().sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res);
  } else if (err instanceof ErrorBaser) {
    err.sendResponse(res);
  } else {
    new ErrorBaser().sendResponse(res);
  }
};

export default errorHandler;
