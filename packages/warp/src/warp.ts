import { Express, Router, Response, NextFunction, RequestHandler, Request as ExpressRequest } from 'express';
import { Container } from 'typedi';
import { getControllerMetadata, ControllerMetadata } from './decorators/controller';
import { getHandlerMetadataList, HandlerMetadata } from './decorators/handler';
import { WarpException } from './exceptions/warpException';
import { BaseResponse } from './responses/baseResponse';
import { getHandlerParamMetaList } from './decorators/params/baseParam';
import { InternalWarpOpts } from './interfaces/internalWarpOpts';
import { GlobalMiddleware } from './interfaces/globalMiddleware';
import { ErrorHandler } from './utils/errorHandler';
import { NotFoundException, NotAcceptableException, UnauthorizedException } from './exceptions';
import { getAuthToken } from './utils/getAuthToken';
import { Request } from './interfaces/request';
import { Logger } from './interfaces';
import { joinPaths } from './utils/joinPaths';

export class Warp {
  private authTokenExtractor: (req: Request) => string | undefined;
  private authenticatorMiddleware: (req: Request, res: Response, next: NextFunction) => void;

  private readonly app: Express;
  private readonly logger: Logger;
  private readonly controllers: any[];
  private readonly middleware: GlobalMiddleware[];
  private readonly options: InternalWarpOpts = {
    validation: true
  };
  private readonly authenticator: (token: string, req: Request) => any;
  private readonly errorHandler: ErrorHandler;
  private readonly basePath: string;

  constructor(opts: {
    app: Express;
    logger: Logger;
    controllers: any[];
    middleware: GlobalMiddleware[];
    options: InternalWarpOpts;
    authenticator?: (token: string, req: Request) => any;
    errorHandler: ErrorHandler;
    basePath?: string;
  }) {
    this.app = opts.app;
    this.logger = opts.logger;
    this.controllers = opts.controllers;
    this.middleware = opts.middleware;
    this.options = opts.options;
    this.authenticator = opts.authenticator;
    this.errorHandler = opts.errorHandler;
    this.basePath = opts.basePath;
  }

  public build() {
    let { app, middleware, controllers, authenticator, options, logger } = this;

    this.authTokenExtractor = getAuthToken(options.authentication);
    this.authenticatorMiddleware = this.prepareAuthenticator().bind(this);

    app.use(((req: Request, res: Response, next: NextFunction) => {
      req.context = {
        options,
        authenticator
      };
      req.logger = logger;

      next();
    }) as any);

    for (let mw of middleware) {
      if (mw.execution == 'before') app.use(mw.middleware);
    }

    controllers.map(Controller => {
      let controllerMetadata = getControllerMetadata(Controller);

      if (!controllerMetadata) {
        throw new WarpException('Please mark controllers using the @Controller decorator.');
      }

      let { routerOptions, path } = controllerMetadata;
      let router = Router(routerOptions);
      let handlers = getHandlerMetadataList(Controller);

      handlers.map(handlerMeta => {
        let handler = this.makeRequestHandler(Controller, handlerMeta);
        this.bindHandler(router, controllerMetadata, handlerMeta, handler as any);
      });

      app.use(joinPaths(path, this.basePath), router);
    });

    for (let mw of middleware) {
      if (mw.execution == 'after') app.use(mw.middleware);
    }

    app.use((req, res, next) => {
      next(new NotFoundException());
    });

    app.use(this.errorHandler as any);

    return app;
  }

  private makeRequestHandler(Controller: any, handlerMetadata: HandlerMetadata) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        let controller = Container.get(Controller);
        let handlerFunction = controller[handlerMetadata.propertyKey];
        let paramMetaList = getHandlerParamMetaList(controller.constructor, handlerMetadata.propertyKey);
        let args: any[] = [];

        await Promise.all(
          paramMetaList.map(async paramMeta => {
            args[paramMeta.index] = await paramMeta.selector(req, res, next, paramMeta, this.options);
          })
        );

        let result = await handlerFunction.bind(controller)(...args);

        if (result instanceof BaseResponse) {
          return await result.execute(req, res, next);
        }

        if (!res.headersSent) {
          return res.send(result);
        }
      } catch (error) {
        return next(error);
      }
    };
  }

  private prepareMiddleware(middleware: RequestHandler[]) {
    return middleware.map(middleware => (req: ExpressRequest, res: Response, next: NextFunction) => {
      try {
        middleware(req, res, next);
      } catch (error) {
        return next(error);
      }
    });
  }

  private prepareAuthenticator() {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (this.authenticator) {
        let token: string;

        try {
          token = this.authTokenExtractor(req);
        } catch (err) {
          next(err);
        }

        if (!token) {
          return next(
            new NotAcceptableException({
              message: 'No authentication token specified',
              code: 'missing_token'
            })
          );
        }

        req.context.authToken = token;
        req.token = token;

        let user: any;

        try {
          user = await this.authenticator(req.token, req);
        } catch (err) {
          next(err);
        }

        if (user === undefined) {
          return next(new UnauthorizedException());
        }

        req.user = user;

        next();
      } else {
        throw new WarpException(`You are using authenticated routes but no authenticator function was provided.`);
      }
    };
  }

  private bindHandler(
    router: Router,
    controllerMetadata: ControllerMetadata,
    handlerMetadata: HandlerMetadata,
    handler: RequestHandler
  ) {
    let rawMiddleware = [...controllerMetadata.middleware, ...handlerMetadata.middleware];

    if (handlerMetadata.authenticated || this.options.authentication?.global) {
      rawMiddleware = [this.authenticatorMiddleware, ...rawMiddleware];
    }

    let middleware = this.prepareMiddleware(rawMiddleware);

    if (handlerMetadata.method == 'get') return router.get(handlerMetadata.path, middleware, handler);
    if (handlerMetadata.method == 'post') return router.post(handlerMetadata.path, middleware, handler);
    if (handlerMetadata.method == 'put') return router.put(handlerMetadata.path, middleware, handler);
    if (handlerMetadata.method == 'patch') return router.patch(handlerMetadata.path, middleware, handler);
    if (handlerMetadata.method == 'delete') return router.delete(handlerMetadata.path, middleware, handler);
    if (handlerMetadata.method == 'options') return router.options(handlerMetadata.path, middleware, handler);
    if (handlerMetadata.method == 'head') return router.head(handlerMetadata.path, middleware, handler);
    if (handlerMetadata.method == 'all') return router.all(handlerMetadata.path, middleware, handler);

    throw new WarpException(`Please specify a valid http method. "${handlerMetadata.method}" is not valid.`);
  }
}
