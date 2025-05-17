import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
//middleware
import { LoggerMiddleware } from './back/middleware/loggerMiddleware';
import { globalExceptionHandler } from './back/middleware/globalExceptionHandler';
// router
import indexRouter from './back/routes/index';
// sequelize
import sequelize from './back/config/db';
// sequelize 연결 확인
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// 모델 동기화 (테이블 생성)
sequelize
  .sync()
  .then(() => {
    console.log('Database & tables have been created!');
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });

const app = express();
// 로그 미들웨어 적용
app.use(LoggerMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// 라우터
app.use('/', indexRouter);

// 모든 예외 처리
app.use(globalExceptionHandler);

export default app;
