import 'express';

declare module 'express' {
  export interface Request {
    verifiedToken?: any;
  }
}
