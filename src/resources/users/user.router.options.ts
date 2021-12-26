import Joi from 'joi';
import UserService from "./user.service";
import userSchema from './user.schema';

const userRouterOptions = {
  getAllUsers: {
    handler: UserService.getAllUsers,
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
      schema: Joi.array().items(userSchema.get)
    }
  },
  getUser: {
    handler: UserService.getUserById,
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
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
      })
    },
    response: {
      schema: userSchema.get
    }
  },
  updateUser: {
    handler: UserService.updateUserById,
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
    },
    response: {
      schema: userSchema.get
    }
  },
  createUser: {
    handler: UserService.createUser,
    plugins: {
      'hapi-swagger': {
        responses: {
          201: {
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
    },
    response: {
      schema: userSchema.get
    }
  },
  deleteUser: {
    handler: UserService.removeUserById,
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
      })
    }
  }
}

export default userRouterOptions;
