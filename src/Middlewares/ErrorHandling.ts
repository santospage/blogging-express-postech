import mongoose from 'mongoose';
import BaseError from '../Errors/BaseError';
import RequestError from '../Errors/RequestError';
import ValidationError from '../Errors/ValidationError';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

const errorHandling: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof mongoose.Error.CastError) {
    new RequestError().sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res);
  } else if (err instanceof BaseError) {
    err.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
};

export default errorHandling;
