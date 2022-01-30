import {IUserData, ICreatedUserData} from './user.interface';

export interface IUserStorage {
  getAllUsers: () => Promise<Array<IUserData> | []>;
  getUserById: (id: string) => Promise<IUserData | never>;
  updateUserById: (id: string, data: IUserData) => Promise<IUserData | never>;
  createUser: (user: ICreatedUserData) => Promise<IUserData>;
  removeUserById: (id: string) => Promise<void | never>;
}
