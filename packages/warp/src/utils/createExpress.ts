import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';

export interface CreateExpressOptions {
  cors?: boolean | CorsOptions | CorsOptionsDelegate;
}

export let createExpress = (opts: CreateExpressOptions) => {
  let app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cookieParser());

  if (opts.cors != false) {
    app.use(cors(opts.cors == true ? undefined : opts.cors));
  }

  app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Varld Warp');
    next();
  });

  return app;
};
