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
