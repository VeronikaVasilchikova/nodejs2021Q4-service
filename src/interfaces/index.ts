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
