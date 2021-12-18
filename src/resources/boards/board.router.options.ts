import Joi from 'joi';
import BoardService from './board.service';
import boardSchema from './board.schema';

const boardRouterOptions = {
  getAllBoards: {
    handler: BoardService.getAllBoards,
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
    handler: BoardService.getBoardById,
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
    handler: BoardService.updateBoardById,
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
    handler: BoardService.createBoard,
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
    handler: BoardService.removeBoardById,
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
