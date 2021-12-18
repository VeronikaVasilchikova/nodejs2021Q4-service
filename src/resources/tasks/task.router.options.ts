import Joi from 'joi';
import TaskService from './task.service';
import taskSchema from './task.schema';

const taskRouterOptions = {
  getAllTasks: {
    handler: TaskService.getAllTasks,
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
      (e.g. "/board/1/tasks")`],
    tags: ['api', 'tasks'],
    validate: {
      params: Joi.object({
        boardId: Joi.string().required()
      })
    },
    response: {
      schema: Joi.array().items(taskSchema.get)
    }
  },
  getTask: {
    handler: TaskService.getTaskById,
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
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
      (e.g. "/board/1/tasks/123")`],
    tags: ['api', 'tasks'],
    validate: {
      params: Joi.object({
        boardId: Joi.string().required(),
        taskId: Joi.string().required()
      })
    },
    response: {
      schema: taskSchema.get
    }
  },
  updateTask: {
    handler: TaskService.updateTaskById,
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
    },
    response: {
      schema: taskSchema.get
    }
  },
  createTask: {
    handler: TaskService.createTask,
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
    },
    response: {
      schema: taskSchema.get
    }
  },
  deleteTask: {
    handler: TaskService.removeTaskById,
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

export default taskRouterOptions;
