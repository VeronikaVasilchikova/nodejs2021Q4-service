import Joi from 'joi';

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
});

export default loginSchema;
