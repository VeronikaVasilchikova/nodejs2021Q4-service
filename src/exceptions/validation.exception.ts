import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  message: string;

  constructor(response: string) {
    super(response, HttpStatus.BAD_REQUEST);
    this.message = response;
  }
}
