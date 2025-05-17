import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

import { CustomError } from '../../class/CustomError';
import { HttpStatus } from '../../enum/HttpStatus.enum';
import { ErrorCode } from '../../enum/ErrorCode.enum';
import { successResponse } from '../../utils/apiResponse';

// model
import Parking from '../../model/parking';

export const createToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { car_number, phone_number, reduction_type, use_from } = req.body;

  try {
    // 중복 생성 체크
    const exList = await Parking.findAll({
      where: {
        car_number: car_number,
        phone_number: phone_number,
        parking_status: {
          [Op.in]: ['CREATED', 'PARK_IN'],
        },
      },
    });
    if (exList.length > 0) {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        `이전에 ${exList.length} 개의 주차권이 존재합니다.`,
        ErrorCode.FORBIDDEN_ACCESS
      );
    }

    // 주차권 생성
    const newParking = await Parking.create({
      car_number: car_number,
      phone_number: phone_number,
      reduction_type: reduction_type,
      use_from: use_from,
      parking_status: 'CREATED',
    });

    // OTK 생성
    const jwtKey = process.env.JWT_KEY as string;
    const token = jwt.sign(
      {
        parking_id: newParking.id,
        car_number: car_number,
        phone_number: phone_number,
        reduction_type: reduction_type,
        use_from: use_from,
      },
      jwtKey
    );

    res.status(HttpStatus.OK).json(
      successResponse({
        token: token,
      })
    );
  } catch (err) {
    next(err);
  }
};
