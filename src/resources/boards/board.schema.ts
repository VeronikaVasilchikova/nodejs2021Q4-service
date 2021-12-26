import Joi from 'joi';

const boardSchema = {
  get: Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    columns: Joi.array().items(Joi.object({
      id: Joi.string(),
      title: Joi.string().required(),
      order: Joi.number().integer().required()
    })).required()
  }),
  update: Joi.object({
    id: Joi.string(),
    title: Joi.string().required(),
    columns: Joi.array().items(Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      order: Joi.number().integer()
    })).required()
  }).required(),
  post: Joi.object({
    title: Joi.string().required(),
    columns: Joi.array().items(Joi.object({
      title: Joi.string().required(),
      order: Joi.number().integer().required()
    })).required()
  }).required()
}

export default boardSchema;
