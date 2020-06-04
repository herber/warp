import { Request, Response, NextFunction } from 'express';

export interface GlobalMiddleware {
  execution?: 'before' | 'after';
  middleware: (req: Request, res: Response, next: NextFunction) => any;
}
