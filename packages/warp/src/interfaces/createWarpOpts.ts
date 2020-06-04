import { Express, Request, Response, NextFunction } from 'express';
import { CreateExpressOptions } from '../utils/createExpress';
import { InternalWarpOpts } from './internalWarpOpts';
import { GlobalMiddleware } from './globalMiddleware';

export interface CreateWarpOpts extends CreateExpressOptions, InternalWarpOpts {
  controllers: any[];
  middleware?: (GlobalMiddleware | ((req: Request, res: Response, next: NextFunction) => any))[];
  authenticator?: (token: string, req: Request) => any;
  express?: Express;
}
