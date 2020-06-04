import { Request } from 'express';
import { Middleware } from './middleware';
import { ForbiddenException } from '../exceptions';

export let Guard = (guardFunction: (req: Request) => boolean) => {
  return Middleware(async (req, res, next) => {
    try {
      let canRun = await guardFunction(req);

      if (canRun) {
        next();
      } else {
        next(new ForbiddenException());
      }
    } catch (err) {
      next(err);
    }
  });
};
