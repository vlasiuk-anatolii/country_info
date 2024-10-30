import { HttpException, HttpStatus } from '@nestjs/common';

export class FetchError extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
