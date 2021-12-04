const Joi = require('joi');
const Boom = require('@hapi/boom');
const {
  getAllTasks,
  getTaskById,
  updateTaskById,
  createTask,
  removeTaskById
} = require('./task.service');
const taskSchema = require('./task.schema');

const taskRouterOptions = {
  getAllTasks: {
    handler: (request, h) => {
      const { boardId } = request;
      const allTasks = getAllTasks(boardId);
      return h.response(allTasks).code(200);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successful operation',
            schema: Joi.array().items(taskSchema.get)
          },
          401: {
            description: 'Access token is missing or invalid'
          }
        }
      }
    },
    description: 'Get Tasks by boardId',
    notes: [`Gets tasks by the Board ID
      (e.g. “/board/1/tasks”)`],
    tags: ['api', 'tasks'],
    response: {
      status: {
        200: Joi.array().items(taskSchema.get),
        401: Joi.string()
      }
    }
  },
  getTask: {
    handler: (request, h) => {
      const { boardId, taskId } = request.params;
      const task = getTaskById(boardId, taskId);
      if (!task) throw Boom.notFound('Task not found');
      return h.response(task).code(201);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          201: {
            description: 'Successful operation',
            schema: taskSchema.get
          },
          401: {
            description: 'Access token is missing or invalid'
          },
          404: {
            description: 'Task not found'
          }
        }
      }
    },
    description: 'Get Task by boardId and taskId',
    notes: [`Gets the Task by the Board's and task ID
      (e.g. “/board/1/tasks/123”)`],
    tags: ['api', 'tasks'],
    validate: {
      params: Joi.object({
        boardId: Joi.string().required(),
        taskId: Joi.string().required()
      }),
    }
  },
  updateTask: {
    handler: async (request, h) => {
      const { payload } = request;
      const { boardId, taskId } = request.params;
      const updatedTask = await updateTaskById(boardId, taskId, payload);
      return h.response(updatedTask).code(200);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'The task has been updated',
            schema: taskSchema.get
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Access token is missing or invalid'
          },
          404: {
            description: 'Task not found'
          }
        }
      }
    },
    description: 'Update task',
    notes: ['Updates the Task by ID'],
    tags: ['api', 'tasks'],
    validate: {
      params: Joi.object({
        boardId: Joi.string().required(),
        taskId: Joi.string().required()
      }),
      payload: taskSchema.update
    }
  },
  createTask: {
    handler: async (request, h) => {
      const { payload, boardId } = request;
      const createdTask = await createTask(boardId, payload);
      return h.response(createdTask).code(201);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          201: {
            description: 'The task has been created',
            schema: taskSchema.get
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Access token is missing or invalid'
          }
        }
      }
    },
    description: 'Create new task',
    notes: ['Creates a new task'],
    tags: ['api', 'tasks'],
    validate: {
      params: Joi.object({
        boardId: Joi.string().required()
      }),
      payload: taskSchema.post
    }
  },
  deleteTask: {
    handler: async (request, h) => {
      const { boardId, taskId } = request.params;
      await removeTaskById(boardId, taskId);
      return h.response('The task has been deleted').code(204);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          204: {
            description: 'The task has been deleted'
          },
          401: {
            description: 'Access token is missing or invalid'
          },
          404: {
            description: 'Task not found'
          }
        }
      }
    },
    description: 'Delete task',
    notes: ['Deletes Task by ID'],
    tags: ['api', 'tasks'],
    validate: {
      params: Joi.object({
        boardId: Joi.string().required(),
        taskId: Joi.string().required()
      }),
    }
  }
}

module.exports = taskRouterOptions;
