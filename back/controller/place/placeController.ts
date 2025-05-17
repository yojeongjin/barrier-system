import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../../class/CustomError';
import { HttpStatus } from '../../enum/HttpStatus.enum';
import { ErrorCode } from '../../enum/ErrorCode.enum';
import { successResponse } from '../../utils/apiResponse';

// model
import Place from '../../model/place';

export const placeList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const place = await Place.findAll();

    if (!place) {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        `주차장 목록이 존재하지 않습니다.`,
        ErrorCode.INVALID_REQUEST
      );
    }

    res.status(HttpStatus.OK).json(
      successResponse({
        data: place,
      })
    );
  } catch (err) {
    next(err);
  }
};
