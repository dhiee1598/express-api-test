/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import ErrorResponse from '../@types/errorResponse';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error(` - Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stacks: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
