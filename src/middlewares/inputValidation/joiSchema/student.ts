import Joi from 'joi';

export const createStudentSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    sex: Joi.string().required(),
    placeOfBirth: Joi.string().allow(''),
    dateOfBirth: Joi.date(),
    email: Joi.string().required(),
  })
  .options({
    abortEarly: false,
  });

export const updateStudentSchema = Joi.object()
  .keys({
    name: Joi.string().allow(''),
    sex: Joi.string().allow(''),
    placeOfBirth: Joi.string().allow(''),
    dateOfBirth: Joi.date(),
    email: Joi.string().allow(''),
  })
  .options({
    abortEarly: false,
  });
