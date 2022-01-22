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

export interface IColumns {
  id: string;
  title: string;
  order: number;
}

export interface IBoardDataBasic {
  title: string;
  columns: Array<IColumns>;
}

export interface IBoardData extends IBoardDataBasic {
  id: string;
}

export interface IDataToLogging {
  name: string;
  params: object | string;
  url: string;
  body: string | object;
  statusCode: number;
}

export interface IErrorDataBasic {
  errorName: string;
  errorMessage: string;
}

export interface IErrorData extends IErrorDataBasic {
  methodName: string | undefined;
  statusCode: number;
}

export interface ILoginPayload {
  password: string;
  name?: string;
  login?: string;
}
