import * as Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Joi from 'joi';
import Boom from '@hapi/boom';
import TaskService from './task.service';
import taskSchema from './task.schema';
import { ITaskData, ITaskDataBasic } from '../helpers/interfaces';

const taskRouterOptions = {
  getAllTasks: {
    handler: (request: Request, h: Hapi.ResponseToolkit): Hapi.ResponseObject => {
      const { boardId } = request.params;
      const allTasks = TaskService.getAllTasks(boardId);
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
    handler: (request: Request, h: Hapi.ResponseToolkit): Hapi.ResponseObject => {
      const { boardId, taskId } = request.params;
      const task = TaskService.getTaskById(boardId, taskId);
      if (!task) throw Boom.notFound('Task not found');
      return h.response(task).code(200);
    },
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
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const payload: ITaskData = <ITaskData>request.payload;
      const { boardId, taskId } = request.params;
      const updatedTask = await TaskService.updateTaskById(boardId, taskId, payload);
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
    },
    response: {
      schema: taskSchema.get
    }
  },
  createTask: {
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const payload: ITaskDataBasic = <ITaskDataBasic>request.payload;
      const { boardId } = request.params;
      const createdTask = await TaskService.createTask(boardId, payload);
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
    },
    response: {
      schema: taskSchema.get
    }
  },
  deleteTask: {
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const { boardId, taskId } = request.params;
      await TaskService.removeTaskById(boardId, taskId);
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

export default taskRouterOptions;
