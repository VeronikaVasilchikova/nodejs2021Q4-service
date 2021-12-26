import { v4 as uuidv4 } from 'uuid';
import User from './user.model';
import {IUserData, ICreatedUserData} from '../helpers/interfaces';

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
   * @returns Promise resolved user data
   */
  public static getUserById = async (userId: string): Promise<IUserData | undefined> => UserMemoryRepository.users.find(user => user.id.toString() === userId.toString());

  /**
   * Returns an updated user based on identifier
   * @param userId user identifier
   * @param data new user data
   * @returns Promise resolved an updated user data
   */
  public static updateUserById = async (userId: string, data: IUserData): Promise<IUserData> => {
    const index = UserMemoryRepository.users.findIndex(item => item.id.toString() === userId.toString());
    const updatedUser = {
      ...UserMemoryRepository.users[index],
      ...data
    };
    UserMemoryRepository.users[index] = updatedUser;
    return UserMemoryRepository.users[index];
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
   * @returns Promise resolved no data
   */
  public static removeUserById = async (userId: string): Promise<void> => {
    UserMemoryRepository.users = UserMemoryRepository.users.filter((user: IUserData) => user.id.toString() !== userId.toString());
  };
}
