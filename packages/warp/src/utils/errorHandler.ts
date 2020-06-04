import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../const';

export let errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (typeof err.message == 'string' && typeof err.status == 'number') {
    if (typeof err.validationErrors != 'undefined') {
      return res.status(err.status).json({
        status: err.status,
        message: err.message,
        validationErrors: err.validationErrors
      });
    } else {
      return res.status(err.status).json({
        status: err.status,
        message: err.message
      });
    }
  }

  console.error(err);

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error'
  });
};
