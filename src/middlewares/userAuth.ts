import { RequestHandler } from 'express';

export const requiredAuth: RequestHandler = (req, res, next) => {
  if (req.session.userId) return next();

  res.status(401);
  throw new Error(' - User not authenticated - ');
};
