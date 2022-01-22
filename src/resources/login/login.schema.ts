import Joi from 'joi';

const loginSchema = Joi.alternatives().try(
  Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().required()
  }),
  Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required()
  })
);

export default loginSchema;
