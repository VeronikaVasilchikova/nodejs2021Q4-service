import * as Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Boom from '@hapi/boom';
import UserMemoryRepository from './user.memory.repository';
import TaskMemoryRepository from '../tasks/task.memory.repository';
import { IUserData, ICreatedUserData, IDataToLogging } from '../helpers/interfaces';
import User from './user.model';
import Logger from '../../logger';
import ErrorHandler from '../../error';

export default class UserService {
  /**
   * Returns Hapi response with all users with status code 200 or throw error
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object or throw error
   */
  public static getAllUsers = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> | never => {
    try {
      const loggerDataObj: IDataToLogging = Logger.createDataToLogging('getAllUsers', request, 200);
      Logger.writeDataToFile('../data/user-logger.json', JSON.stringify(loggerDataObj));
      const allUsers = await UserMemoryRepository.getAllUsers();
      const res = allUsers.length ? allUsers.map(User.toResponse.bind(User)) : [];
      return h.response(res).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        ErrorHandler.handleError('getAllUsers', (<Error>error).message, 500);
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
      const loggerDataObj: IDataToLogging = Logger.createDataToLogging('getUserById', request, 200);
      Logger.writeDataToFile('../data/user-logger.json', JSON.stringify(loggerDataObj));
      const user = await UserMemoryRepository.getUserById(<string>userId)
      return h.response(User.toResponse(user)).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        ErrorHandler.handleError('getUserById', (<Error>error).message, 500);
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
      const loggerDataObj: IDataToLogging = Logger.createDataToLogging('updateUserById', request, 200);
      Logger.writeDataToFile('../data/user-logger.json', JSON.stringify(loggerDataObj));
      const payload: IUserData = <IUserData>request.payload;
      const {userId} = request.params;
      const updatedUser: IUserData = await UserMemoryRepository.updateUserById(<string>userId, payload);
      return h.response(User.toResponse(updatedUser)).code(200);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        ErrorHandler.handleError('updateUserById', (<Error>error).message, 500);
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
      const loggerDataObj: IDataToLogging = Logger.createDataToLogging('createUser', request, 201);
      Logger.writeDataToFile('../data/user-logger.json', JSON.stringify(loggerDataObj));
      const payload: ICreatedUserData = <ICreatedUserData>request.payload;
      const createdUser = await UserMemoryRepository.createUser(payload);
      return h.response(User.toResponse(createdUser)).code(201);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        ErrorHandler.handleError('createUser', (<Error>error).message, 500);
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
      const loggerDataObj: IDataToLogging = Logger.createDataToLogging('removeUserById', request, 204);
      Logger.writeDataToFile('../data/user-logger.json', JSON.stringify(loggerDataObj));
      const {userId} = request.params;
      await TaskMemoryRepository.updateTaskByUserId(<string>userId);
      await UserMemoryRepository.removeUserById(<string>userId);
      return h.response('The user has been deleted').code(204);
    }
    catch (error) {
      if (!Boom.isBoom(error)) {
        ErrorHandler.handleError('removeUserById', (<Error>error).message, 500);
        throw Boom.badImplementation((<Error>error).message);
      }
      throw error;
    }
  }
}
