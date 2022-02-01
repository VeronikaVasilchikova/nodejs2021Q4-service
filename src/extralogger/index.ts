import * as fs from 'fs';
import { IErrorDataBasic } from '../interfaces';
import { FILE_PATH, VAR_LOG } from '../constants';

export default class ExtraLogger {
  /**
   * Write logs to a file
   * @param log - logging data
   * @returns return nothing or throw error
   */
  public static writeErrorToFile = (log: string): void | never => {
    const filePath: string = FILE_PATH.ERROR;
    if (fs.existsSync(filePath)) {
      fs.appendFileSync(filePath, `${log}\n`);
    }
    else {
      throw new Error(`Have no access to ${filePath}`);
    }
  }

  /**
   * Method to log errors caused by unhandledRejection or uncaughtException methods
   * @param errorName - error name
   * @param methodName - method name
   * @returns return nothing
   */
  public static logProcessError = (errorName: string, errorMessage: string): void => {
    const errorData: IErrorDataBasic = {
      errorName,
      errorMessage,
      timestamp: new Date().toISOString()
    };
    if (VAR_LOG.PROCESS.includes(<string>process.env.LOGGING_VAR)) {
      this.writeErrorToFile(JSON.stringify(errorData));
    }
  };

  /**
   * Clear all files with logs after server started
   * @returns return nothing or throw error
   */
  public static clearAllLogFiles = (): void | never => {
    const logFiles: string[] = Object.values(FILE_PATH);
    logFiles.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
      }
      else {
        throw new Error(`Have no access to ${filePath}`);
      }
    })
  }
}
