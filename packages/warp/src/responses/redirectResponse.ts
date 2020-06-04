import express from 'express';
import { OutgoingHttpHeaders } from 'http';
import { BaseResponse } from './baseResponse';

export class RedirectResponse extends BaseResponse {
  constructor(
    public readonly location: string,
    public readonly status?: number,
    public readonly headers?: OutgoingHttpHeaders
  ) {
    super();
  }

  async execute(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (this.headers) res.set(this.headers);

    if (!res.headersSent) {
      if (this.status) return res.redirect(this.status, this.location);
      return res.redirect(this.location);
    }
  }
}
