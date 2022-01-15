import { getRepository } from 'typeorm';
import Boom from '@hapi/boom';
import {IUserData, ICreatedUserData} from '../helpers/interfaces';
import Logger from '../../logger';
import { Users } from '../../entity/users.entity';

export default class UserMemoryRepository {
  /**
   * Returns all users
   * @returns Promise resolved user array
   */
  public static getAllUsers = async (): Promise<Array<IUserData> | []> => {
    const repo = getRepository(Users);
    const allUsers = await repo.find();
    return allUsers;
  };

  /**
   * Returns an existing user based on identifier
   * @param id user identifier
   * @returns Promise resolved user data or throw error with status code 404
   */
  public static getUserById = async (id: string): Promise<IUserData | never> => {
    const repo = getRepository(Users);
    const userItem = await repo.findOne({ where: { id } });
    if (userItem !== undefined) {
      return userItem;
    }

      Logger.logError('clientError', 'getUserById', `User with id=${id} not found`, 404);
      throw Boom.notFound(`User with id=${id} not found`);

  };

  /**
   * Returns an updated user based on identifier
   * @param id user identifier
   * @param data new user data
   * @returns Promise resolved an updated user data or throw error with status code 404
   */
  public static updateUserById = async (id: string, data: IUserData): Promise<IUserData | never> => {
    const repo = getRepository(Users);
    const updatedUser = await repo.findOne(id);
    if (updatedUser !== undefined) {
      await repo.update(id, data);
      return updatedUser;
    }

      Logger.logError('clientError', 'updateUserById', `User with id=${id} not found`, 404);
      throw Boom.notFound(`User with id=${id} not found`);

  };

  /**
   * Returns a newly created user data
   * @param user new user data
   * @returns Promise resolved a newly created user data
   */
  public static createUser = async (user: ICreatedUserData): Promise<IUserData> => {
    const repo = getRepository(Users);
    const newUser = repo.create(user);
    await repo.save(newUser);
    return newUser;
  };

  /**
   * Remove an existing user from database based on user identifier
   * @param id identifier of user
   * @returns Promise resolved no data or throw error with status code 404
   */
  public static removeUserById = async (id: string): Promise<void | never> => {
    const repo = getRepository(Users);
    const deletedUser = await repo.findOne({ where: { id } });
    if (deletedUser !== undefined) {
      await repo.delete(id);
    }
    else {
      Logger.logError('clientError', 'removeUserById', `User with id=${id} not found`, 404);
      throw Boom.notFound(`User with id=${id} not found`);
    }
  };
}
