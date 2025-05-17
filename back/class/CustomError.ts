import { ErrorCode } from '../enum/ErrorCode.enum';
import { HttpStatus } from '../enum/HttpStatus.enum';

export class CustomError extends Error {
  public statusCode: HttpStatus;
  public message: string;
  public details: any;
  public errorCode: ErrorCode;

  constructor(statusCode: HttpStatus, message: string, errorCode: ErrorCode, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
    this.errorCode = errorCode;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
