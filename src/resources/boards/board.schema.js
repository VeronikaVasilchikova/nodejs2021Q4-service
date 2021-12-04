const Joi = require('joi');

const boardSchema = {
  get: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    columns: Joi.array().items(Joi.object({
      id: Joi.string(),
      title: Joi.string().required(),
      order: Joi.number().required()
    })).required()
  }),
  update: Joi.object({
    title: Joi.string().required(),
    columns: Joi.array().items(Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      order: Joi.number()
    })).required()
  }).required(),
  post: Joi.object({
    title: Joi.string().required(),
    columns: Joi.array().items(Joi.object({
      title: Joi.string().required(),
      order: Joi.number().required()
    })).required()
  }).required()
}

module.exports = boardSchema;
