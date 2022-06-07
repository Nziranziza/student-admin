import Joi from 'joi';

export const createStudyGroupSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    leader: Joi.string().allow(''),
    subject: Joi.string().allow(''),
    time: Joi.string().allow(''),
  })
  .options({
    abortEarly: false,
  });

export const updateStudyGroupSchema: Joi.ObjectSchema = Joi.object()
  .keys({
    name: Joi.string().allow(''),
    leader: Joi.string().allow(''),
    subject: Joi.string().allow(''),
    time: Joi.string().allow(''),
  })
  .options({
    abortEarly: false,
  });
