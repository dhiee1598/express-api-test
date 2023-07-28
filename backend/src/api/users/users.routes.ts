import express from 'express';
import * as UsersHandler from './users.handler';
import { requiredAuth } from '../../middlewares/userAuth';

const router = express.Router();

router.get('/', requiredAuth, UsersHandler.getAuthenticatedUser);

router.post('/logout', UsersHandler.logoutUser);

router.post('/login', UsersHandler.login);

router.post('/signup', UsersHandler.registerUser);

export default router;
