import { Request as ExpressRequest } from 'express';
import { WarpContext } from './warpContext';

export interface Request extends ExpressRequest {
  user?: any;
  token?: string;
  context: WarpContext;
}
