import { Request, Response, NextFunction } from 'express';

/**
 * req, res 로그 미들웨어
 */
export const LoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  // res 캡처
  const originalSend = res.send;
  const responseBody: any[] = [];

  // res.send 캡처해서 로그에 남기기
  res.send = function (this: Response, ...args: Parameters<typeof res.send>) {
    responseBody.push(args[0]);

    // responseBody를 문자열로 변환하여 res.locals.body에 저장
    res.locals.body = typeof args[0] === 'string' ? args[0] : JSON.stringify(args[0]);

    return originalSend.apply(this, args);
  };

  // 요청 본문이 들어오면 로깅
  const logRequest = () => {
    const body = req.body ? JSON.stringify(req.body) : '';

    const requestLog = {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body,
    };

    console.log('>>>>> Request:', requestLog);
  };

  // 응답이 끝날 때 로깅
  res.on('finish', () => {
    const endTime = Date.now();

    // 응답 로그
    const responseLog = {
      statusCode: res.statusCode,
      body: res.locals.body,
      responseTime: endTime - startTime,
    };

    console.log('<<<<< Response:', responseLog);
  });

  // 요청 로그 출력
  logRequest();

  next();
};
