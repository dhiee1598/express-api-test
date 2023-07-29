import { rateLimit } from 'express-rate-limit';

export const loginRateLimit = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 10,
  message: 'Too many request, Please try again in a few minutes',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

export const signUpRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});

export const createGoalRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: 'Too many request, Please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});
