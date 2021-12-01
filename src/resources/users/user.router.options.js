const Joi = require('joi');
const {
  getAllUsers,
  getUserById,
  updateUserById,
  createUser,
  removeUserById
} = require('./user.service');

const userSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  login: Joi.string(),
  password: Joi.string()
});
const allUsersSchema = Joi.array().items(userSchema);

const userRouterOptions = {
  getAllUsers: {
    handler: (request, h) => {
      console.log(h);
      return getAllUsers();
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successful operation',
            schema: allUsersSchema
          },
          401: {
            description: 'UnauthorizedError'
          }
        }
      }
    },
    description: 'Get all users',
    notes: ['Gets all users (remove password from response)'],
    tags: ['api', 'users']
  },
  getUser: {
    handler: (request, h) => {
      console.log(h);
      const { userId } = request.params;
      return getUserById(userId);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successful operation',
            schema: userSchema
          },
          401: {
            description: 'UnauthorizedError'
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
    tags: ['api', 'users']
  },
  updateUser: {
    handler: (request, h) => {
      console.log(h);
      const { payload } = request;
      const { userId } = request.params;
      return updateUserById(userId, payload);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successful operation',
            schema: userSchema
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'UnauthorizedError'
          }
        }
      }
    },
    description: 'Update a user',
    notes: ['Updates a user by ID'],
    tags: ['api', 'users']
  },
  createUser: {
    handler: (request, h) => {
      console.log(h);
      const { payload } = request;
      return createUser(payload);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successful operation',
            schema: userSchema
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'UnauthorizedError'
          }
        }
      }
    },
    description: 'Create user',
    notes: ['Creates a new user (remove password from response)'],
    tags: ['api', 'users']
  },
  deleteUser: {
    handler: (request, h) => {
      console.log(h);
      const { userId } = request.params;
      return removeUserById(userId);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          204: {
            description: 'The user has been deleted'
          },
          401: {
            description: 'UnauthorizedError'
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
  }
}

module.exports = userRouterOptions;
