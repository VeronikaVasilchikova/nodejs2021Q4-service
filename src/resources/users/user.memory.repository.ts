import { v4 as uuidv4 } from 'uuid';
import User from './user.model';
import {IUserData, ICreatedUserData} from '../helpers/interfaces';

export default class UserMemoryRepository {
  private static users: Array<IUserData> = [new User({})];
  public static getAllUsers = (): Array<IUserData> => UserMemoryRepository.users;

  public static getUserById = (userId: string): IUserData | undefined => UserMemoryRepository.users.find(user => user.id.toString() === userId.toString());

  public static updateUserById = async (userId: string, data: IUserData): Promise<IUserData> => {
    const index = await UserMemoryRepository.users.findIndex(item => item.id.toString() === userId.toString());
    const updatedUser = {
      ...UserMemoryRepository.users[index],
      ...data
    };
    UserMemoryRepository.users[index] = updatedUser;
    return UserMemoryRepository.users[index];
  };

  public static createUser = async (user: ICreatedUserData): Promise<IUserData> => {
    const newUser = {id: uuidv4(), ...user};
    await UserMemoryRepository.users.push(newUser);
    return newUser;
  };

  public static removeUserById = async (userId: string): Promise<void> => {
    UserMemoryRepository.users = await UserMemoryRepository.users.filter((user: IUserData) => user.id.toString() !== userId.toString());
  };
}
