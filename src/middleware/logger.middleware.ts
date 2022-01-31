
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body, query } = request;
    const bodyToString = `request body-${JSON.stringify(body)}`;
    const queryToString = `query-${JSON.stringify(query)}`;

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `Method-${method}, URL-${originalUrl}, ${bodyToString}, ${queryToString}, statusCode-${statusCode}`
      );
    });

    next();
  }
}
// import path from 'path';
// import fs from 'fs';
// import { Request } from 'express';
// import { IDataToLogging, IErrorData, IErrorDataBasic } from '../interfaces';

// export default class Logger {
//   /**
//    * Create object with request info and response status code
//    * @param name - method name
//    * @param request - request object
//    * @param statusCode - response status code
//    * @returns object with request info and response status code
//    */
//   public static createDataToLogging = (name: string, request: Request, statusCode: number): IDataToLogging => ({
//       name,
//       params: Object.keys(request.params).length ? request.params : 'there are no params',
//       url: request.url,
//       body: request.body || 'there is no body',
//       statusCode
//   })

//   /**
//    * Clear a file after server started
//    * @param filename - path to a file
//    * @returns return nothing or throw error
//    */
//   public static clearFile = (filePath: string): void | never => {
//     if (fs.existsSync(filePath)) {
//       fs.writeFileSync(filePath, '');
//     }
//     else {
//       throw new Error(`Have no access to ${filePath}`);
//     }
//   }

//   /**
//    * Write logs to a file
//    * @param filename - path to a file
//    * @param log - logging data
//    * @returns return nothing or throw error
//    */
//   public static writeDataToFile = (filename: string, log: string): void | never => {
//     const isProductionMode: boolean = process.argv[2] === 'production';
//     const filePath = path.resolve(__dirname, isProductionMode ? `../${filename}` : filename);
//     if (fs.existsSync(filePath)) {
//       fs.appendFileSync(filePath, `${log}\n`);
//     }
//     else {
//       throw new Error(`Have no access to ${filePath}`);
//     }
//   }

//   /**
//    * Method to log request info
//    * @param name - method name
//    * @param request - request object
//    * @param filePath - path to a file
//    * @param statusCode response status code
//    * @returns return nothing
//    */
//   public static logRequestInfo = (name: string, request: Request, filePath: string, statusCode: number): void => {
//     const loggerDataObj: IDataToLogging = this.createDataToLogging(name, request, statusCode);
//     if (['info', 'error', 'fatal', 'all'].includes(<string>process.env.LOGGING_VAR)) {
//       this.writeDataToFile(filePath, JSON.stringify(loggerDataObj));
//     }
//   };

//   /**
//    * Method to log validation error
//    * @param name - method name
//    * @param error - Boom error
//    * @param filePath - path to a file
//    * @returns return nothing
//    */
//   public static logValidationError = (name: string | undefined, error: Error, filePath: string): void => {
//     const validationErrorData: IErrorData = {
//       errorName: error?.name,
//       methodName: name,
//       errorMessage: error.message,
//       statusCode: 400
//     };
//     if (['warn', 'info', 'error', 'fatal', 'all'].includes(<string>process.env.LOGGING_VAR)) {
//       this.writeDataToFile(filePath, JSON.stringify(validationErrorData));
//     }
//   };

//   /**
//    * Method to log server or client error
//    * @param errorName - error name
//    * @param methodName - method name
//    * @param errorMessage server error
//    * @param statusCode response status code
//    * @returns return nothing
//    */
//   public static logError = (errorName: string, methodName: string, errorMessage: string, statusCode: number): void => {
//     const errorData: IErrorData = {
//       errorName,
//       methodName,
//       errorMessage,
//       statusCode
//     };
//     if (['error', 'fatal', 'all'].includes(<string>process.env.LOGGING_VAR)) {
//       this.writeDataToFile('../../logs/error-logger.json', JSON.stringify(errorData));
//     }
//   };

//   /**
//    * Method to log errors caused by unhandledRejection or uncaughtException methods
//    * @param errorName - error name
//    * @param methodName - method name
//    * @returns return nothing
//    */
//   public static logProcessError = (errorName: string, errorMessage: string): void => {
//     const errorData: IErrorDataBasic = {
//       errorName,
//       errorMessage
//     };
//     if (['fatal', 'all'].includes(<string>process.env.LOGGING_VAR)) {
//       this.writeDataToFile('../../logs/error-logger.json', JSON.stringify(errorData));
//     }
//   };
// }
