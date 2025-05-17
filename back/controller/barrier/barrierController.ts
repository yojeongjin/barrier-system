import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { CustomError } from '../../class/CustomError';
import { HttpStatus } from '../../enum/HttpStatus.enum';
import { ErrorCode } from '../../enum/ErrorCode.enum';
import { successResponse } from '../../utils/apiResponse';

// model
import Parking from '../../model/parking';

export const openBarrier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { parking_id } = req.verifiedToken;
  const { cmd } = req.body;

  const statusMap: Record<string, string> = {
    entry: 'PARK_IN',
    exit: 'PARK_OUT',
  };

  try {
    const response = await axios.post(
      `http://${url}`,
      {
        action: 'open',
      },
      {
        headers: {
          Authorization: 'Bearer 1xxx-4xx-4Exxxx-xxx-xxxxxC8786',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      await Parking.update(
        {
          parking_status: statusMap[cmd],
        },
        {
          where: {
            id: parking_id,
          },
        }
      );

      res.status(HttpStatus.OK).json(successResponse());
    } else {
      throw new CustomError(
        HttpStatus.FORBIDDEN,
        response.data.message,
        ErrorCode.FORBIDDEN_ACCESS
      );
    }
  } catch (err) {
    next(err);
  }
};
