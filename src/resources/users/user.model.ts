import { v4 as uuidv4 } from 'uuid';
import {IUserData, IUserDataToResponse, IUserDataOptional} from '../helpers/interfaces';

export default class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'}: IUserDataOptional = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  public static toResponse(user: IUserData): IUserDataToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
