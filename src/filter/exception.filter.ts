import { ArgumentsHost, ExceptionFilter, Catch, HttpStatus, HttpException } from "@nestjs/common";
import { HttpAdapterHost } from '@nestjs/core';
import * as fs from 'fs';
import { FILE_PATH, VAR_LOG } from '../constants';
import { ValidationException } from '../exceptions/validation.exception';

@Catch()
export class Exception implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = exception instanceof HttpException ? exception.message : 'Server error';
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      errorMessage
    };

    if (VAR_LOG.EXCEPTION.includes(<string>process.env.LOGGING_VAR)) {
      this.writeExceptionToFile(JSON.stringify(responseBody));
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  /**
   * Write exception to a file
   * @param log - logging data
   * @returns return nothing or throw error
   */
  private writeExceptionToFile = (log: string): void | never => {
    const filePath: string = FILE_PATH.ERROR;
    if (fs.existsSync(filePath)) {
      fs.appendFileSync(filePath, `${log}\n`);
    }
    else {
      throw new Error(`Have no access to ${filePath}`);
    }
  }
}
