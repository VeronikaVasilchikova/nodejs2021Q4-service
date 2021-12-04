const Joi = require('joi');

const userSchema = {
  get: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    login: Joi.string().required()
  }),
  update: Joi.object({
    name: Joi.string(),
    login: Joi.string(),
    password: Joi.string()
  }).required(),
  post: Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required()
  }).required()
};

module.exports = userSchema;
