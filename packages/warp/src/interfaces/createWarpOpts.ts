import { Express, Response, Request as ExpressRequest, NextFunction } from 'express';
import { CreateExpressOptions } from '../utils/createExpress';
import { InternalWarpOpts } from './internalWarpOpts';
import { GlobalMiddleware } from './globalMiddleware';
import { Logger } from './logger';
import { ErrorHandler } from '../utils/errorHandler';
import { Request } from './request';

export interface CreateWarpOpts extends CreateExpressOptions, InternalWarpOpts {
  controllers: any[];
  middleware?: (GlobalMiddleware | ((req: ExpressRequest, res: Response, next: NextFunction) => any))[];
  authenticator?: (token: string, req: Request) => any;
  express?: Express;
  logger?: Logger;
  errorHandler?: ErrorHandler;
  basePath?: string;
}
