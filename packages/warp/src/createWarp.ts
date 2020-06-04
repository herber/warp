import { createExpress } from './utils/createExpress';
import { Warp } from './warp';
import { CreateWarpOpts } from './interfaces/createWarpOpts';
import { cleanupGlobalMiddleware } from './utils/cleanupGlobalMiddleware';

export let createWarp = (opts: CreateWarpOpts) => {
  let app = opts.express;

  if (!app) {
    app = createExpress({ cors: opts.cors });
  }

  let middleware = cleanupGlobalMiddleware(opts.middleware);
  let warp = new Warp(
    app,
    opts.controllers,
    middleware,
    {
      validation: opts.validation,
      authentication: opts.authentication
    },
    opts.authenticator
  );

  app = warp.build();

  return app;
};
