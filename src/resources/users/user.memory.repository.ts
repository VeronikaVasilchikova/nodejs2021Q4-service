import { v4 as uuidv4 } from 'uuid';
import Boom from '@hapi/boom';
import User from './user.model';
import {IUserData, ICreatedUserData} from '../helpers/interfaces';
import Logger from '../../logger';

export default class UserMemoryRepository {
  private static users: Array<IUserData> = [new User({})];

  /**
   * Returns all users
   * @returns Promise resolved user array
   */
  public static getAllUsers = async (): Promise<Array<IUserData> | []> => UserMemoryRepository.users;

  /**
   * Returns an existing user based on identifier
   * @param userId user identifier
   * @returns Promise resolved user data or throw error with status code 404
   */
  public static getUserById = async (userId: string): Promise<IUserData | never> => {
    const userItem = UserMemoryRepository.users.find(user => user.id.toString() === userId.toString());
    if (!userItem) {
      Logger.logError('getUserById', `User with id=${userId} not found`, 404);
      throw Boom.notFound(`User with id=${userId} not found`);
    }
    return userItem;
  };

  /**
   * Returns an updated user based on identifier
   * @param userId user identifier
   * @param data new user data
   * @returns Promise resolved an updated user data or throw error with status code 404
   */
  public static updateUserById = async (userId: string, data: IUserData): Promise<IUserData | never> => {
    const index = UserMemoryRepository.users.findIndex(item => item.id.toString() === userId.toString());
    if (index === -1) {
      Logger.logError('updateUserById', `User with id=${userId} not found`, 404);
      throw Boom.notFound(`User with id=${userId} not found`);
    }
    else {
      const updatedUser = {
        ...UserMemoryRepository.users[index],
        ...data
      };
      UserMemoryRepository.users[index] = updatedUser;
      return UserMemoryRepository.users[index];
    }
  };

  /**
   * Returns a newly created user data
   * @param user new user data
   * @returns Promise resolved a newly created user data
   */
  public static createUser = async (user: ICreatedUserData): Promise<IUserData> => {
    const newUser = {id: uuidv4(), ...user};
    UserMemoryRepository.users.push(newUser);
    return newUser;
  };

  /**
   * Remove an existing user from database based on user identifier
   * @param userId identifier of user
   * @returns Promise resolved no data or throw error with status code 404
   */
  public static removeUserById = async (userId: string): Promise<void | never> => {
    const userByIdIndex = UserMemoryRepository.users.findIndex(user => user.id.toString() === userId.toString());
    if (userByIdIndex === -1) {
      Logger.logError('removeUserById', `User with id=${userId} not found`, 404);
      throw Boom.notFound(`User with id=${userId} not found`);
    }
    else {
      UserMemoryRepository.users = UserMemoryRepository.users.filter((user: IUserData) => user.id.toString() !== userId.toString());
    }
  };
}
