import UserMemoryRepository from './user.memory.repository';
const tasksRepo = require('../tasks/task.memory.repository');
import {IUserData, ICreatedUserData} from '../helpers/interfaces';

export default class UserService {
  public static getAllUsers = (): Array<IUserData> => UserMemoryRepository.getAllUsers();

  public static getUserById = (userId: string): IUserData | undefined => UserMemoryRepository.getUserById(userId);

  public static updateUserById = (userId: string, data: IUserData): Promise<IUserData> => UserMemoryRepository.updateUserById(userId, data);

  public static createUser = (user: ICreatedUserData): Promise<IUserData> => UserMemoryRepository.createUser(user);

  public static removeUserById = (userId: string): void => {
    tasksRepo.updateTaskByUserId(userId);
    UserMemoryRepository.removeUserById(userId);
  };
};
