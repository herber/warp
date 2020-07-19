import express, { NextFunction, Response } from 'express';
import { MetadataKeys } from '../../const';
import { InternalWarpOpts } from '../../interfaces/internalWarpOpts';
import { Request } from '../../interfaces';

export type HandlerParamSelector<T> = (
  req: Request,
  res: Response,
  next: NextFunction,
  meta: HandlerParamMeta<T>,
  opts: InternalWarpOpts
) => T;

export interface HandlerParamMeta<T> {
  index: number;
  selector: HandlerParamSelector<T>;
  paramType: any;
}

export let getHandlerParamMetaList = (controller: any, propertyKey: string): HandlerParamMeta<any>[] => {
  let metaList = Reflect.getMetadata(MetadataKeys.param, controller, propertyKey);
  if (metaList == null) return [];

  return metaList;
};

export let setHandlerParamMetaList = (controller: any, meta: HandlerParamMeta<any>[], propertyKey: string) => {
  Reflect.defineMetadata(MetadataKeys.param, meta, controller, propertyKey);
};

export let BaseParam = <T>(selector: HandlerParamSelector<T>) => {
  return (target: any, propertyKey: string, index: number) => {
    let previousHandlerParamList = getHandlerParamMetaList(target.constructor, propertyKey);

    let meta: HandlerParamMeta<any>[] = [
      {
        index,
        selector,
        paramType: Reflect.getMetadata('design:paramtypes', target, propertyKey)[index]
      },
      ...previousHandlerParamList
    ];

    setHandlerParamMetaList(target.constructor, meta, propertyKey);
  };
};
