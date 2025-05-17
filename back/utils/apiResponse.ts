import { ApiResponse } from '../interface/IApiResponse';
import { HttpStatus } from '../enum/HttpStatus.enum';
import { ErrorCode } from '../enum/ErrorCode.enum';

export function successResponse<T>(data?: T): ApiResponse<T> {
  return {
    success: true,
    code: HttpStatus.OK,
    msg: 'Request was successful',
    data,
  };
}

export function errorResponse(
  statusCode: HttpStatus,
  errorCode: ErrorCode,
  description: string,
): ApiResponse<null> {
  return {
    success: false,
    code: statusCode,
    error: { code: errorCode, description },
  };
}

export function internalServerError(description: string): ApiResponse<null> {
  return {
    success: false,
    code: HttpStatus.INTERNAL_SERVER_ERROR, // 500 Internal Server Error 코드 사용
    msg: 'An internal server error occurred',
    error: { code: ErrorCode.INTERNAL_ERROR, description }, // 내부 서버 오류 코드 및 설명
  };
}
