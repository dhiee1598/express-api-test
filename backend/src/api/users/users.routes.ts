import express from 'express';
import * as UsersHandler from './users.handler';
import { requiredAuth } from '../../middlewares/userAuth';
import * as RateLimit from '../../middlewares/ratelimit';

const router = express.Router();

router.get('/', requiredAuth, UsersHandler.getAuthenticatedUser);

router.post('/logout', UsersHandler.logoutUser);

router.post('/login', RateLimit.loginRateLimit, UsersHandler.login);

router.post('/signup', RateLimit.signUpRateLimit, UsersHandler.registerUser);

export default router;
