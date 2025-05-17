import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../../class/CustomError';
import { HttpStatus } from '../../enum/HttpStatus.enum';
import { ErrorCode } from '../../enum/ErrorCode.enum';
import { successResponse } from '../../utils/apiResponse';
// model
import Parking from '../../model/parking';

export const parkingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { parking_id } = req.verifiedToken;

  try {
    const parkingInfo = await Parking.findOne({
      where: {
        id: parking_id,
      },
    });

    if (!parkingInfo) {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        '주차 내역이 존재하지 않습니다.',
        ErrorCode.FORBIDDEN_ACCESS
      );
    }

    res.status(HttpStatus.OK).json(
      successResponse({
        data: parkingInfo,
      })
    );
  } catch (err) {
    next(err);
  }
};
