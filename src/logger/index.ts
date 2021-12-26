import path from 'path';
import fs from 'fs';
import { Request } from "@hapi/hapi";
import { IDataToLogging, IErrorData } from '../resources/helpers/interfaces';

export default class Logger {
  /**
   * Create object with request info and response status code
   * @param name - method name
   * @param request - Hapi request object
   * @param statusCode - response status code
   * @returns object with request info and response status code
   */
  public static createDataToLogging = (name: string, request: Request, statusCode: number): IDataToLogging => ({
      name,
      params: Object.keys(request.params).length ? request.params : 'there are no params',
      url: request.url.href,
      body: request.payload || 'there is no body',
      statusCode
  })

  /**
   * Clear a file after server started
   * @param filename - path to a file
   * @returns return nothing or throw error
   */
  public static clearFile = (filePath: string): void | never => {
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
    }
    else {
      throw new Error(`Have no access to ${filePath}`);
    }
  }

  /**
   * Write logs to a file
   * @param filename - path to a file
   * @param log - logging data
   * @returns return nothing or throw error
   */
  public static writeDataToFile = (filename: string, log: string): void | never => {
    const filePath = path.resolve(__dirname, filename);
    if (fs.existsSync(filePath)) {
      fs.appendFile(filePath, `${log}\n`, (error: NodeJS.ErrnoException | null): void | never => {
        if (error) {
          throw new Error(`${error}`);
        }
      });
    }
    else {
      throw new Error(`Have no access to ${filePath}`);
    }
  }

  /**
   * Method to log request info
   * @param name - method name
   * @param request - Hapi request object
   * @param filePath - path to a file
   * @param statusCode response status code
   * @returns return nothing
   */
  public static logRequestInfo = (name: string, request: Request, filePath: string, statusCode: number): void => {
    const loggerDataObj: IDataToLogging = this.createDataToLogging(name, request, statusCode);
    this.writeDataToFile(filePath, JSON.stringify(loggerDataObj));
  };

  /**
   * Method to log validation error
   * @param name - method name
   * @param error - Boom error
   * @param filePath - path to a file
   * @returns return nothing
   */
  public static logValidationError = (name: string | undefined, error: Error, filePath: string): void => {
    const validationErrorData: IErrorData = {
      errorName: error?.name,
      methodName: name,
      errorMessage: error.message,
      statusCode: 400
    };
    this.writeDataToFile(filePath, JSON.stringify(validationErrorData));
  };

  /**
   * Method to log server or client error
   * @param errorName - error name
   * @param methodName - method name
   * @param errorMessage server error
   * @param statusCode response status code
   * @returns return nothing
   */
  public static logError = (errorName: string, methodName: string, errorMessage: string, statusCode: number): void => {
    const errorData: IErrorData = {
      errorName,
      methodName,
      errorMessage,
      statusCode
    };
    this.writeDataToFile('../data/error-logger.json', JSON.stringify(errorData));
  };
}
