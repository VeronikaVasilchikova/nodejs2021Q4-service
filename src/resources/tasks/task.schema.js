const Joi = require('joi');

const taskSchema = {
  get: Joi.object({
    id: Joi.string(),
    title: Joi.string().required(),
    order: Joi.number().required(),
    description: Joi.string(),
    userId: Joi.string(),
    boardId: Joi.string().required(),
    columnId: Joi.string().required()
  }),
  update: Joi.object({
    title: Joi.string(),
    order: Joi.number().required(),
    description: Joi.string(),
    userId: Joi.string(),
    boardId: Joi.string().required(),
    columnId: Joi.string().required()
  }).required(),
  post: Joi.object({
    title: Joi.string().required(),
    order: Joi.number().required(),
    description: Joi.string(),
    userId: Joi.string(),
    boardId: Joi.string().required(),
    columnId: Joi.string().required()
  }).required()
}

module.exports = taskSchema;
