import Joi from 'joi';

export const createStudyGroupSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    leader: Joi.string(),
    subject: Joi.string(),
    time: Joi.string(),
  })
  .options({
    abortEarly: false,
  });

export const updateStudyGroupSchema = Joi.object()
  .keys({
    name: Joi.string().allow(''),
    leader: Joi.string().allow(''),
    subject: Joi.string().allow(''),
    time: Joi.string().allow(''),
  })
  .options({
    abortEarly: false,
  });
