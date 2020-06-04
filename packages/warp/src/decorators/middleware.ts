import { RequestHandler } from 'express';
import { getHandlerMetadataList, HandlerMetadata, setHandlerMetadataList } from './handler';

export let Middleware = (middleware: RequestHandler[] | RequestHandler) => {
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
          if (Array.isArray(middleware)) {
            handler.middleware = [...middleware, ...(handler.middleware || [])];
          } else {
            handler.middleware = [middleware, ...(handler.middleware || [])];
          }
        }

        return handler;
      });
    } else {
      newHandlerList = [
        ...previousHandlerList,
        {
          propertyKey,
          middleware: Array.isArray(middleware) ? middleware : [middleware]
        }
      ];
    }

    setHandlerMetadataList(target.constructor, newHandlerList);
  };
};
