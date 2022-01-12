import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';

export interface CreateExpressOptions {
  cors?: boolean | CorsOptions | CorsOptionsDelegate;
  bodyParser?: {
    urlEncoded?: bodyParser.OptionsUrlencoded;
    json?: bodyParser.OptionsJson;
  };
  cookies?: {
    secret?: string | string[];
    options?: cookieParser.CookieParseOptions;
  };
}

export let createExpress = (opts: CreateExpressOptions) => {
  let app = express();

  app.use(bodyParser.urlencoded(Object.assign({}, opts?.bodyParser?.urlEncoded, { extended: false })));
  app.use(bodyParser.json(opts?.bodyParser?.json));

  app.use(cookieParser(opts?.cookies?.secret, opts?.cookies?.options));

  if (opts.cors != false) {
    app.use(cors(opts.cors == true ? undefined : opts.cors));
  }

  app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Highloop Slates');
    next();
  });

  return app;
};
