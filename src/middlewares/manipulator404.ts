import { Request, Response, NextFunction } from 'express';

import NotFound from '../errors/not-found';

const manipulator404 = (req: Request, res: Response, next: NextFunction): void => {
  const error404 = new NotFound();
  next(error404);
};

export default manipulator404;
