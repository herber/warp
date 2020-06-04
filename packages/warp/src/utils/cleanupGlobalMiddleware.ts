import { Request, Response, NextFunction } from 'express';
import { GlobalMiddleware } from '../interfaces/globalMiddleware';

export let cleanupGlobalMiddleware = (
  middleware?: (GlobalMiddleware | ((req: Request, res: Response, next: NextFunction) => any))[]
) => {
  let newMiddleware: GlobalMiddleware[] = [];

  for (let mw of middleware || []) {
    // @ts-ignore
    if (typeof mw.execution == 'string' && typeof mw.middleware == 'function') {
      // @ts-ignore
      newMiddleware.push(mw);
    } else {
      newMiddleware.push({
        // @ts-ignore
        middleware: mw,
        execution: 'before'
      });
    }
  }

  return newMiddleware;
};
