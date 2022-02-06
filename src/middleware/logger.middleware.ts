import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import { FILE_PATH, VAR_LOG } from '../constants';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body, query } = request;
    const bodyToString = `request body-${JSON.stringify(body)}`;
    const queryToString = `query-${JSON.stringify(query)}`;

    response.on('finish', () => {
      const { statusCode } = response;
      const log = `Method-${method}, URL-${originalUrl}, ${bodyToString}, ${queryToString}, statusCode-${statusCode}`;

      if (VAR_LOG.REQ.includes(<string>process.env.LOGGING_VAR)) {
        this.logger.log(log);
        if (statusCode < 400) {
          this.writeLogToFile(originalUrl, log);
        }
      }
    });

    next();
  }

  /**
   * Write logs to a file
   * @param originalUrl - request url
   * @param log - logging data
   * @returns return nothing or throw error
   */
  private writeLogToFile = (originalUrl: string, log: string): void | never => {
    let filePath = FILE_PATH.ERROR;
    if (originalUrl.includes('boards') && !originalUrl.includes('tasks')) {
      filePath = FILE_PATH.BOARD;
    }
    if (originalUrl.includes('tasks')) {
      filePath = FILE_PATH.TASK;
    }
    if (originalUrl.includes('users')) {
      filePath = FILE_PATH.USER;
    }

    if (fs.existsSync(filePath)) {
      fs.appendFileSync(filePath, `${log}\n`);
    } else {
      throw new Error(`Have no access to ${filePath}`);
    }
  };
}
