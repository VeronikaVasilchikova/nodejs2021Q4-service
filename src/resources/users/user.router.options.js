const Joi = require('joi');
const Boom = require('@hapi/boom');
const {
  getAllUsers,
  getUserById,
  updateUserById,
  createUser,
  removeUserById
} = require('./user.service');
const User = require('./user.model');
const userSchema = require('./user.schema');

const userRouterOptions = {
  getAllUsers: {
    handler: (request, h) => {
      const allUsers = getAllUsers();
      return h.response(allUsers.map(User.toResponse)).code(200);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successful operation',
            schema: Joi.array().items(userSchema.get)
          },
          401: {
            description: 'Access token is missing or invalid'
          }
        }
      }
    },
    description: 'Get all users',
    notes: ['Gets all users (remove password from response)'],
    tags: ['api', 'users'],
    response: {
      status: {
        200: Joi.array().items(userSchema.get),
        401: Joi.string()
      }
    }
  },
  getUser: {
    handler: (request, h) => {
      const { userId } = request.params;
      const user = getUserById(userId);
      if (!user) throw Boom.notFound('User not found');
      return h.response(User.toResponse(user)).code(201);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          201: {
            description: 'Successful operation',
            schema: userSchema.get
          },
          401: {
            description: 'Access token is missing or invalid'
          },
          404: {
            description: 'User not found'
          }
        }
      }
    },
    description: 'Get user by ID',
    notes: [`Gets a user by ID
      e.g. "/users/123" (remove password from response)`],
    tags: ['api', 'users'],
    validate: {
      params: Joi.object({
        userId: Joi.string().required()
      }),
    }
  },
  updateUser: {
    handler: async (request, h) => {
      const { payload } = request;
      const { userId } = request.params;
      const updatedUser = await updateUserById(userId, payload);
      return h.response(User.toResponse(updatedUser)).code(200);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successful operation',
            schema: userSchema.get
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
    description: 'Update a user',
    notes: ['Updates a user by ID'],
    tags: ['api', 'users'],
    validate: {
      params: Joi.object({
        userId: Joi.string().required()
      }),
      payload: userSchema.update
    }
  },
  createUser: {
    handler: async (request, h) => {
      const { payload } = request;
      const createdUser = await createUser(payload);
      return h.response(User.toResponse(createdUser)).code(200);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successful operation',
            schema: userSchema.get
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
    description: 'Create user',
    notes: ['Creates a new user (remove password from response)'],
    tags: ['api', 'users'],
    validate: {
      payload: userSchema.post
    }
  },
  deleteUser: {
    handler: async (request, h) => {
      const { userId } = request.params;
      await removeUserById(userId);
      return h.response('The user has been deleted').code(204);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          204: {
            description: 'The user has been deleted'
          },
          401: {
            description: 'Access token is missing or invalid'
          },
          404: {
            description: 'User not found'
          }
        }
      }
    },
    description: 'Delete user',
    notes: [`Deletes user by ID. When somebody
      DELETE User, all Tasks where User is assignee
      should be updated to put userId=null`],
    tags: ['api', 'users'],
    validate: {
      params: Joi.object({
        userId: Joi.string().required()
      }),
    }
  }
}

module.exports = userRouterOptions;
