import { getHandlerMetadataList, HandlerMetadata, setHandlerMetadataList } from './handler';

export let Authenticated = () => {
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
          handler.authenticated = true;
        }

        return handler;
      });
    } else {
      newHandlerList = [
        ...previousHandlerList,
        {
          propertyKey,
          authenticated: true,
          middleware: []
        }
      ];
    }

    setHandlerMetadataList(target.constructor, newHandlerList);
  };
};
