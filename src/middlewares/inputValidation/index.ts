import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import { joiErrorCustomizer } from '../../utilities';
import {
  createStudentSchema,
  updateStudentSchema
} from './joiSchema';

const inputValidation = (schema: ObjectSchema) => (req: Request , res: Response, next: NextFunction) => {
  const {
    body
  } = req;
  const { error } = schema.validate(body);
  if (error) {
    return res.status(400).send({
      error: joiErrorCustomizer(error),
    });
  }
  return next();
};

export const createStudentInputValidation = inputValidation(createStudentSchema);
export const updateStudentInputValidation = inputValidation(updateStudentSchema);