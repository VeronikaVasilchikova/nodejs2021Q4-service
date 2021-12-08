import Joi from 'joi';

const alternativeValidation = Joi.alternatives().try(Joi.string().required(), null);
const taskSchema = {
  get: Joi.object({
    id: Joi.string(),
    title: Joi.string().required(),
    order: Joi.number().integer().required(),
    description: Joi.string(),
    userId: Joi.alternatives().try(Joi.string(), null),
    boardId: alternativeValidation,
    columnId: alternativeValidation
  }),
  update: Joi.object({
    id: Joi.string(),
    title: Joi.string(),
    order: Joi.number().integer().required(),
    description: Joi.string(),
    userId: alternativeValidation,
    boardId: alternativeValidation,
    columnId: alternativeValidation
  }).required(),
  post: Joi.object({
    title: Joi.string().required(),
    order: Joi.number().integer().required(),
    description: Joi.string(),
    userId: alternativeValidation,
    boardId: alternativeValidation,
    columnId: alternativeValidation
  }).required()
}

export default taskSchema;
