import fs from 'fs';
import path from 'path';
import { IErrorData } from '../resources/helpers/interfaces';

export default class ErrorHandler {
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
   * Write error to a file
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
   * Method to handle server or client error
   * @param name - operation name
   * @param errorMessage server error
   * @param statusCode response status code
   * @returns return nothing
   */
  public static handleError = (name: string, errorMessage: string, statusCode: number): void => {
    const errorData: IErrorData = {
      name,
      errorMessage,
      statusCode
    };
    this.writeDataToFile('../data/error-logger.json', JSON.stringify(errorData));
  };
}
