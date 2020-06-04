import { RequestHandler, RouterOptions } from 'express';
import { MetadataKeys } from '../const';

export interface ControllerMetadata {
  path: string;
  middleware: RequestHandler[];
  routerOptions: RouterOptions;
}

export let getControllerMetadata = (ControllerConstructor: any): ControllerMetadata | undefined => {
  return Reflect.getMetadata(MetadataKeys.controller, ControllerConstructor);
};

export let setControllerMetadata = (ControllerConstructor: any, meta: ControllerMetadata): void => {
  Reflect.defineMetadata(MetadataKeys.controller, meta, ControllerConstructor);
};

export let Controller = (path: string, middleware: RequestHandler[] = [], routerOptions: RouterOptions = {}) => {
  return (target: any) => {
    setControllerMetadata(target, {
      path,
      middleware,
      routerOptions
    });
  };
};
