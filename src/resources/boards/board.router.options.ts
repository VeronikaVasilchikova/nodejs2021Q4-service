import * as Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Joi from 'joi';
import Boom from '@hapi/boom';
import BoardService from './board.service';
import TaskService from '../tasks/task.service';
import boardSchema from './board.schema';
import { IBoardData, IBoardDataBasic } from '../helpers/interfaces';

const boardRouterOptions = {
  getAllBoards: {
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const allBoards = await BoardService.getAllBoards();
      return h.response(allBoards).code(200);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successful operation',
            schema: Joi.array().items(boardSchema.get)
          },
          401: {
            description: 'Access token is missing or invalid'
          }
        }
      }
    },
    description: 'Get all boards',
    notes: ['Returns all boards'],
    tags: ['api', 'boards'],
    response: {
      schema: Joi.array().items(boardSchema.get)
    }
  },
  getBoard: {
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const {boardId} = request.params;
      const board = await BoardService.getBoardById(<string>boardId);
      if (!board) throw Boom.notFound('Board not found');
      return h.response(board).code(200);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successful operation',
            schema: boardSchema.get
          },
          401: {
            description: 'Access token is missing or invalid'
          },
          404: {
            description: 'Board not found'
          }
        }
      }
    },
    description: 'Get board by id',
    notes: ['Gets the Board by ID (e.g. "/boards/123")'],
    tags: ['api', 'boards'],
    validate: {
      params: Joi.object({
        boardId: Joi.string().required()
      })
    },
    response: {
      schema: boardSchema.get
    }
  },
  updateBoard: {
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const payload: IBoardData = <IBoardData>request.payload;
      const {boardId} = request.params;
      const updatedBoard: IBoardData = await BoardService.updateBoardById(<string>boardId, payload);
      return h.response(updatedBoard).code(200);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'The board has been updated',
            schema: boardSchema.get
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
    description: 'Update board',
    notes: ['Updates a Board by ID'],
    tags: ['api', 'boards'],
    validate: {
      params: Joi.object({
        boardId: Joi.string().required()
      }),
      payload: boardSchema.update
    },
    response: {
      schema: boardSchema.get
    }
  },
  createBoard: {
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const payload: IBoardDataBasic = <IBoardDataBasic>request.payload;
      const createdBoard = await BoardService.createBoard(payload);
      return h.response(createdBoard).code(201);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          201: {
            description: 'The board has been created',
            schema: boardSchema.get
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
    description: 'Create board',
    notes: ['Creates a new board'],
    tags: ['api', 'boards'],
    validate: {
      payload: boardSchema.post
    },
    response: {
      schema: boardSchema.get
    }
  },
  deleteBoard: {
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const {boardId} = request.params;
      await BoardService.removeBoardById(<string>boardId);
      await TaskService.removeTaskById(<string>boardId);
      return h.response('The board has been deleted').code(204);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          204: {
            description: 'The board has been deleted'
          },
          401: {
            description: 'Access token is missing or invalid'
          },
          404: {
            description: 'Board not found'
          }
        }
      }
    },
    description: 'Delete board',
    notes: ['Deletes a Board by ID'],
    tags: ['api', 'boards'],
    validate: {
      params: Joi.object({
        boardId: Joi.string().required()
      })
    }
  }
}

export default boardRouterOptions;
