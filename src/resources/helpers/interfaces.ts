import * as HapiSwagger from 'hapi-swagger';

interface IUserBasicData {
  name: string;
  login: string;
}
export interface IUserDataToResponse extends IUserBasicData {
  id: string;
}
export interface IUserData extends IUserDataToResponse {
  password: string;
}

export interface ICreatedUserData extends IUserBasicData {
  password: string;
}

export interface IUserDataOptional {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
}
