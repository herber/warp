import { Request as ExpressRequest } from 'express';
import { WarpContext } from './warpContext';
import { Logger } from './logger';

export interface Request extends ExpressRequest {
  user?: any;
  token?: string;
  context: WarpContext;
  logger: Logger;
}
