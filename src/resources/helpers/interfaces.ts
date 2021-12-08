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

export interface ITaskDataBasic {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export interface ITaskData extends ITaskDataBasic {
  id: string;
}

export interface ITaskDataOptional {
  id?: string;
  title?: string;
  order?: number;
  description?: string;
  userId?: string;
  boardId?: string;
  columnId?: string;
}