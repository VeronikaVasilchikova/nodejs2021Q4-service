import * as Hapi from '@hapi/hapi';
import { Request } from "@hapi/hapi";
import Boom from '@hapi/boom';
import UserMemoryRepository from './user.memory.repository';
import TaskMemoryRepository from '../tasks/task.memory.repository';
import {IUserData, ICreatedUserData} from '../helpers/interfaces';
import User from './user.model';

export default class UserService {
  /**
   * Returns Hapi response with all users
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object
   */
  public static getAllUsers = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
    try {
      const allUsers = await UserMemoryRepository.getAllUsers();
      const res = allUsers.length ? allUsers.map(User.toResponse.bind(User)) : [];
      return h.response(res).code(200);
    }
    catch (error) {
      throw Boom.badImplementation((<Error>error).message);
    }
  }

  /**
   * Returns Hapi response with user data
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object
   */
  public static getUserById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
    const {userId} = request.params;
    try {
      const user = await UserMemoryRepository.getUserById(<string>userId)
      return h.response(User.toResponse(<IUserData>user)).code(200);
    }
    catch (error) {
      throw Boom.badImplementation((<Error>error).message);
    }
  }

  /**
   * Returns Hapi response with updated user data
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object
   */
  public static updateUserById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
    try {
      const payload: IUserData = <IUserData>request.payload;
      const {userId} = request.params;
      const updatedUser: IUserData = await UserMemoryRepository.updateUserById(<string>userId, payload);
      return h.response(User.toResponse(updatedUser)).code(200);
    }
    catch (error) {
      throw Boom.badImplementation((<Error>error).message);
    }
  }

  /**
   * Returns Hapi response with newly created user data
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object
   */
  public static createUser = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
    try {
      const payload: ICreatedUserData = <ICreatedUserData>request.payload;
      const createdUser = await UserMemoryRepository.createUser(payload);
      return h.response(User.toResponse(createdUser)).code(201);
    }
    catch (error) {
      throw Boom.badImplementation((<Error>error).message);
    }
  }

  /**
   * Returns Hapi response with message about deleted user
   * @param request Hapi request
   * @param h Hapi response
   * @returns Promise resolved Hapi response object
   */
  public static removeUserById = async (request: Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
    try {
      const {userId} = request.params;
      await TaskMemoryRepository.updateTaskByUserId(<string>userId);
      await UserMemoryRepository.removeUserById(<string>userId);
      return h.response('The user has been deleted').code(204);
    }
    catch (error) {
      throw Boom.badImplementation((<Error>error).message);
    }
  }
}
