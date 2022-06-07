import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

import { joiErrorCustomizer } from '../../utilities';
import {
  createStudentSchema,
  updateStudentSchema,
  createStudyGroupSchema,
  updateStudyGroupSchema,
} from './joiSchema';

const inputValidation =
  (schema: ObjectSchema): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) => {
      const { body } = req;
      const { error } = schema.validate(body);
      if (error) {
        return res.status(400).send({
          error: joiErrorCustomizer(error),
        });
      }
      return next();
    };

export const createStudentInputValidation: RequestHandler =
  inputValidation(createStudentSchema);
export const updateStudentInputValidation: RequestHandler =
  inputValidation(updateStudentSchema);
export const createStudyGroupInputValidation: RequestHandler = inputValidation(
  createStudyGroupSchema
);
export const updateStudyGroupInputValidation: RequestHandler = inputValidation(
  updateStudyGroupSchema
);
