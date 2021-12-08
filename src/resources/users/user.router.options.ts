import * as Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Boom from '@hapi/boom';
import Joi from 'joi';
import UserService from "./user.service";
import User from './user.model';
import userSchema from './user.schema';
import {IUserData, ICreatedUserData} from '../helpers/interfaces';

const userRouterOptions = {
  getAllUsers: {
    handler: (request: Request, h: Hapi.ResponseToolkit): Hapi.ResponseObject => {
      const allUsers = UserService.getAllUsers();
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
      schema: Joi.array().items(userSchema.get)
    }
  },
  getUser: {
    handler: (request: Request, h: Hapi.ResponseToolkit): Hapi.ResponseObject => {
      const { userId } = request.params;
      const user = UserService.getUserById(userId);
      if (!user) throw Boom.notFound('User not found');
      return h.response(User.toResponse(user)).code(200);
    },
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
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const payload: IUserData = <IUserData>request.payload;
      const { userId } = request.params;
      const updatedUser = await UserService.updateUserById(userId, payload);
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
    },
    response: {
      schema: userSchema.get
    }
  },
  createUser: {
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const payload: ICreatedUserData = <ICreatedUserData>request.payload;
      const createdUser = await UserService.createUser(payload);
      return h.response(User.toResponse(createdUser)).code(201);
    },
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
    handler: async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
      const { userId } = request.params;
      await UserService.removeUserById(userId);
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
      })
    }
  }
}

export default userRouterOptions;
