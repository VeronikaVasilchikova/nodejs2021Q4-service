const Joi = require('joi');

const nameValidationRule = Joi.string().required().example('test name');
const loginValidationRule = Joi.string().required().example('test login');

const userSchema = {
  get: Joi.object({
    id: Joi.string().required(),
    name: nameValidationRule,
    login: loginValidationRule
  }),
  update: Joi.object({
    id: Joi.string(),
    name: nameValidationRule,
    login: Joi.string().example('test login'),
    password: Joi.string().example('@password')
  }).required(),
  post: Joi.object({
    name: nameValidationRule,
    login: loginValidationRule,
    password: Joi.string().required().example('@password')
  }).required()
};

module.exports = userSchema;
