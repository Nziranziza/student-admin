import Joi from 'joi';

export const createStudentSchema = Joi.object().keys({
  name: Joi.string().required(),
  sex: Joi.string().required(),
  placeOfBirth: Joi.string(),
  dateOfBirth: Joi.string(),
  email: Joi.string().required()
}).options({
  abortEarly: false
});

export const updateStudentSchema = Joi.object().keys({
  name: Joi.string(),
  sex: Joi.string(),
  placeOfBirth: Joi.string(),
  dateOfBirth: Joi.string(),
  email: Joi.string()
}).options({
  abortEarly: false
})