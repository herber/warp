import express from 'express';
import { OutgoingHttpHeaders } from 'http';
import { BaseResponse } from './baseResponse';

export class SimpleResponse extends BaseResponse {
  constructor(
    public readonly data: any,
    public readonly status: number = 200,
    public readonly headers?: OutgoingHttpHeaders
  ) {
    super();
  }

  async execute(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (this.headers) res.set(this.headers);

    if (!res.headersSent) {
      return res.status(this.status).send(this.data);
    }
  }
}
