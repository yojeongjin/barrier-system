import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../class/CustomError';
import { errorResponse, internalServerError } from '../utils/apiResponse';

export const globalExceptionHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // 예외(CustomError) 처리
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(errorResponse(err.statusCode, err.errorCode, err.message));

    return;
  }

  // 예기치 못한 서버 오류 처리
  console.error('Unexpected Error: ', err);
  res.status(500).json(internalServerError('Internal server error occurred.'));
  return;
};
