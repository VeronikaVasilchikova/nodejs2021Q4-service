import UserMemoryRepository from './user.memory.repository';
import TaskMemoryRepository from '../tasks/task.memory.repository';
import {IUserData, ICreatedUserData} from '../helpers/interfaces';

export default class UserService {
  /**
   * Returns all users
   * @returns Promise resolved user array
   */
  public static getAllUsers = (): Promise<Array<IUserData> | []> => UserMemoryRepository.getAllUsers();

  /**
   * Returns an existing user based on identifier
   * @param userId user identifier
   * @returns Promise resolved user data
   */
  public static getUserById = (userId: string): Promise<IUserData | undefined> => UserMemoryRepository.getUserById(userId);

  /**
   * Returns an updated user based on identifier
   * @param userId user identifier
   * @param data new user data
   * @returns Promise resolved an updated user data
   */
  public static updateUserById = (userId: string, data: IUserData): Promise<IUserData> => UserMemoryRepository.updateUserById(userId, data);

  /**
   * Returns a newly created user data
   * @param user new user data
   * @returns Promise resolved a newly created user data
   */
  public static createUser = (user: ICreatedUserData): Promise<IUserData> => UserMemoryRepository.createUser(user);

  /**
   * Remove an existing user from database based on user identifier
   * @param userId identifier of user
   * @returns Promise resolved no data
   */
  public static removeUserById = (userId: string): void => {
    TaskMemoryRepository.updateTaskByUserId(userId);
    UserMemoryRepository.removeUserById(userId);
  };
}
