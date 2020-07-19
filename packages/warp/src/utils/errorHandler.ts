import { Response, NextFunction } from 'express';
import { HttpStatus } from '../const';
import { Request } from '../interfaces';

export let errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if ((typeof err.data == 'string' || typeof err.data?.code == 'string') && typeof err.status == 'number') {
    req.logger.error(`${err.status} - ${err.data?.code || err.data || 'Error in HTTP Handler'}`);

    if (typeof err.data.code == 'string') {
      return res.status(err.status).json(
        Object.assign(
          {
            status: err.status,
            code: 'error'
          },
          err.data
        )
      );
    } else {
      return res.status(err.status).json({
        status: err.status,
        code: err.data
      });
    }
  } else {
    req.logger.error(err.message || 'Error in HTTP Handler');
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'internal_server_error'
  });
};
