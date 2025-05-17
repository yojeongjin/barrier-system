import { HttpStatus } from '../enum/HttpStatus.enum';
import { ErrorCode } from '../enum/ErrorCode.enum';

/**
 * API 응답 공통 구조
 */
export interface ApiResponse<T> {
  success: boolean;
  code: HttpStatus;
  msg?: string;
  data?: T;
  error?: ApiError;
}

/**
 * API 에러 응답 공통 구조
 */
export interface ApiError {
  code: ErrorCode; // 에러 코드
  description: string; // 에러 설명
}
