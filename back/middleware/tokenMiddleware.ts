import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../class/CustomError';
import { HttpStatus } from '../enum/HttpStatus.enum';
import { ErrorCode } from '../enum/ErrorCode.enum';

export const tokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']
    ? req.headers['authorization'].split(' ')[1]
    : null;

  if (!token) {
    return next(
      new CustomError(
        HttpStatus.UNAUTHORIZED,
        '토큰이 존재하지 않습니다.',
        ErrorCode.UNAUTHORIZED_ACCESS
      )
    );
  }

  try {
    const jwtKey = process.env.JWT_KEY as string;
    const verifiedToken = jwt.verify(token, jwtKey);

    req.verifiedToken = verifiedToken;

    next();
  } catch (err) {
    // 토큰 검증 실패 처리
    return next(
      new CustomError(
        HttpStatus.FORBIDDEN,
        '유효하지 않은 토큰입니다.',
        ErrorCode.FORBIDDEN_ACCESS
      )
    );
  }
};
