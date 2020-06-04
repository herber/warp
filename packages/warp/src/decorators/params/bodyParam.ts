import { transformAndValidate } from 'class-transformer-validator';
import { BaseParam } from './baseParam';
import { ValidationException } from '../../exceptions/http/validationException';

export let Body = () => {
  return BaseParam(async (req, res, next, meta, opts) => {
    try {
      return meta.paramType !== Object && opts.validation != false
        ? await transformAndValidate(meta.paramType, req.body, {
            validator: opts.validation != true ? opts.validation : undefined
          })
        : req.body;
    } catch (err) {
      throw new ValidationException('Invalid Request Data', err);
    }
  });
};
