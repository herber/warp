import { MetadataKeys } from '../const';
import { RequestHandler } from 'express';

export interface HandlerMetadata {
  method?: string;
  path?: string;
  propertyKey: string;
  middleware?: RequestHandler[];
  authenticated?: boolean;
}

export let getHandlerMetadataList = (controller: any): HandlerMetadata[] => {
  let metaList = Reflect.getMetadata(MetadataKeys.handler, controller);
  if (!metaList) return [];

  return metaList;
};

export let setHandlerMetadataList = (controller: any, metadataList: HandlerMetadata[]) => {
  Reflect.defineMetadata(MetadataKeys.handler, metadataList, controller);
};

export let baseHandler = (method: string, path: string, middleware: RequestHandler[] = []) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let previousHandlerList = getHandlerMetadataList(target.constructor);
    let foundHandler: HandlerMetadata | undefined;
    let newHandlerList: HandlerMetadata[];

    for (let handler of previousHandlerList) {
      if (handler.propertyKey == propertyKey) {
        foundHandler = handler;
        break;
      }
    }

    if (foundHandler) {
      newHandlerList = previousHandlerList.map(handler => {
        if (handler.propertyKey == propertyKey) {
          handler.middleware = [...middleware, ...(handler.middleware || [])];
          handler.method = method;
          handler.path = path;
        }

        return handler;
      });
    } else {
      newHandlerList = [
        ...previousHandlerList,
        {
          method,
          path,
          propertyKey,
          middleware
        }
      ];
    }

    setHandlerMetadataList(target.constructor, newHandlerList);
  };
};

export let Get = (path: string, middleware?: RequestHandler[]) => {
  return baseHandler('get', path, middleware);
};

export let Post = (path: string, middleware?: RequestHandler[]) => {
  return baseHandler('post', path, middleware);
};

export let Put = (path: string, middleware?: RequestHandler[]) => {
  return baseHandler('put', path, middleware);
};

export let Patch = (path: string, middleware?: RequestHandler[]) => {
  return baseHandler('patch', path, middleware);
};

export let Delete = (path: string, middleware?: RequestHandler[]) => {
  return baseHandler('delete', path, middleware);
};

export let Options = (path: string, middleware?: RequestHandler[]) => {
  return baseHandler('options', path, middleware);
};

export let Head = (path: string, middleware?: RequestHandler[]) => {
  return baseHandler('head', path, middleware);
};

export let All = (path: string, middleware?: RequestHandler[]) => {
  return baseHandler('all', path, middleware);
};
