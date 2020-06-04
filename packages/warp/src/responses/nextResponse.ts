import express from 'express';
import { BaseResponse } from './baseResponse';

export class NextResponse extends BaseResponse {
  constructor(public readonly error?: Error) {
    super();
  }

  async execute(req: express.Request, res: express.Response, next: express.NextFunction) {
    return next(this.error);
  }
}
