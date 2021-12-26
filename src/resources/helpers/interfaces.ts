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
