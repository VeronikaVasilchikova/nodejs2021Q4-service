const Joi = require('joi');

const taskSchema = {
  get: Joi.object({
    id: Joi.string(),
    title: Joi.string().required(),
    order: Joi.number().required(),
    description: Joi.string(),
    userId: Joi.string() || null,
    boardId: Joi.string().required() || null,
    columnId: Joi.string().required() || null
  }),
  update: Joi.object({
    title: Joi.string(),
    order: Joi.number().required(),
    description: Joi.string(),
    userId: Joi.string() || null,
    boardId: Joi.string().required() || null,
    columnId: Joi.string().required() || null
  }).required(),
  post: Joi.object({
    title: Joi.string().required(),
    order: Joi.number().required(),
    description: Joi.string(),
    userId: Joi.string() || null,
    boardId: Joi.string().required() || null,
    columnId: Joi.string().required() || null
  }).required()
}

module.exports = taskSchema;
