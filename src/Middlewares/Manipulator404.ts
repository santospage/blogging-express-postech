import { Request, Response, NextFunction } from 'express';
import NotFound from '../Errors/NotFound';

const manipulator404 = (req: Request, res: Response, next: NextFunction): void => {
  const error404 = new NotFound();
  next(error404);
};

export default manipulator404;
