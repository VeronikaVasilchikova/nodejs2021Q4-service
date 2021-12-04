const Joi = require('joi');
const Boom = require('@hapi/boom');
const {
  getAllBoards,
  getBoardById,
  updateBoardById,
  createBoard,
  removeBoardById
} = require('./board.service');
const boardSchema = require('./board.schema');

const boardRouterOptions = {
  getAllBoards: {
    handler: (request, h) => {
      const allBoards = getAllBoards();
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
    tags: ['api', 'boards']
  },
  getBoard: {
    handler: (request, h) => {
      const { boardId } = request.params;
      const board = getBoardById(boardId);
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
      }),
    }
  },
  updateBoard: {
    handler: async (request, h) => {
      const { payload } = request;
      const { boardId } = request.params;
      const updatedBoard = await updateBoardById(boardId, payload);
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
    }
  },
  createBoard: {
    handler: async (request, h) => {
      const { payload } = request;
      const createdBoard = await createBoard(payload);
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
    }
  },
  deleteBoard: {
    handler: async (request, h) => {
      const { boardId } = request.params;
      await removeBoardById(boardId);
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
      }),
    }
  }
}

module.exports = boardRouterOptions;
