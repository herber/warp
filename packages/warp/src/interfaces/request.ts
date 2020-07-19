import { Request as ExpressRequest } from 'express';
import winston from 'winston';
import { WarpContext } from './warpContext';

export interface Request extends ExpressRequest {
  user?: any;
  token?: string;
  context: WarpContext;
  logger: winston.Logger;
}
