import Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Boom from '@hapi/boom';
import UserMemoryRepository from './user.memory.repository';
import TaskMemoryRepository from '../tasks/task.memory.repository';
import { IUserData, ICreatedUserData } from '../helpers/interfaces';
import { Users } from '../../entity/users.entity';
import Logger from '../../logger';
import { verifyToken } from '../helpers/utils';

export default class UserService {
  /**
   * Returns Hapi response with all users with status code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static getAllUsers = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'getAllUsers', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('getAllUsers', request, '../../logs/user-logger.json', 200);
      const allUsers = await UserMemoryRepository.getAllUsers();
      const res = allUsers.length ? allUsers.map(Users.toResponse.bind(Users)) : [];
      return h.response(res).header('Authorization', `Bearer ${token}`).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'getAllUsers', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with user data with status code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static getUserById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    const {userId} = request.params;
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'getUserById', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('getUserById', request, '../../logs/user-logger.json', 200);
      const user = await UserMemoryRepository.getUserById(<string>userId)
      return h.response(Users.toResponse(user)).header('Authorization', `Bearer ${token}`).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'getUserById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with updated user data with status code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static updateUserById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'updateUserById', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('updateUserById', request, '../../logs/user-logger.json', 200);
      const payload: IUserData = <IUserData>request.payload;
      const {userId} = request.params;
      const updatedUser: IUserData = await UserMemoryRepository.updateUserById(<string>userId, payload);
      return h.response(Users.toResponse(updatedUser)).header('Authorization', `Bearer ${token}`).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'updateUserById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with newly created user data with status code 201 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static createUser = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'createUser', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('createUser', request, '../../logs/user-logger.json', 201);
      const payload: ICreatedUserData = <ICreatedUserData>request.payload;
      const createdUser = await UserMemoryRepository.createUser(payload);
      return h.response(Users.toResponse(createdUser)).header('Authorization', `Bearer ${token}`).code(201);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'createUser', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }

  /**
   * Returns Hapi response with message about deleted user with status code 204 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static removeUserById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const token = await verifyToken(request);
      if (!token) {
        Logger.logError('clientError', 'removeUserById', 'Unauthorized', 401);
        throw Boom.unauthorized();
      }
      Logger.logRequestInfo('removeUserById', request, '../../logs/user-logger.json', 204);
      const {userId} = request.params;
      await TaskMemoryRepository.updateTaskByUserId(<string>userId);
      await UserMemoryRepository.removeUserById(<string>userId);
      return h.response('The user has been deleted').header('Authorization', `Bearer ${token}`).code(204);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        Logger.logError('serverError', 'removeUserById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }
}
