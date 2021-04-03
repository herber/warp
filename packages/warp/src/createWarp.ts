import { createExpress } from './utils/createExpress';
import { Warp } from './warp';
import { CreateWarpOpts } from './interfaces/createWarpOpts';
import { cleanupGlobalMiddleware } from './utils/cleanupGlobalMiddleware';
import { createLogger } from './utils/createLogger';
import { errorHandler } from './utils/errorHandler';

export let createWarp = (opts: CreateWarpOpts) => {
  let app = opts.express;
  let logger = opts.logger;

  if (!app) {
    app = createExpress({ cors: opts.cors });
  }

  if (!logger) {
    logger = createLogger();
  }

  let middleware = cleanupGlobalMiddleware(opts.middleware);
  let warp = new Warp({
    app,
    logger,
    controllers: opts.controllers,
    middleware,
    options: {
      validation: opts.validation,
      authentication: opts.authentication
    },
    authenticator: opts.authenticator,
    errorHandler: opts.errorHandler || errorHandler,
    basePath: opts.basePath
  });

  app = warp.build();

  return app;
};
