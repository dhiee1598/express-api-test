import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { LoginProps, UserProps } from '../../@types/userProps';
import UsersModel from '../users/users.model';
import bcrypt from 'bcrypt';

export const registerUser: RequestHandler<unknown, unknown, UserProps, unknown> = asyncHandler(async (req, res) => {
  // * desc:    CREATE NEW USERS
  // * routes:  GET /api/users
  // * access:  PUBLIC

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // ! Check if all field is not undefined
  if (!username || !email || !password) {
    res.status(400);
    throw new Error(' - Parameters missing - ');
  }

  // ! Check if username is already taken
  const existingUsername = await UsersModel.findOne({ username: username }).exec();

  if (existingUsername) {
    res.status(409);
    throw new Error(' - Username already exist - ');
  }

  // ! Check if the email add is already exist
  const existingEmail = await UsersModel.findOne({ email: email }).exec();

  if (existingEmail) {
    res.status(409);
    throw new Error(' - A user with thise email address already exists - ');
  }

  const passwordHashed = await bcrypt.hash(password, 10);

  const newUser = await UsersModel.create({
    username: username,
    password: passwordHashed,
    email: email,
  });

  req.session.userId = newUser._id;
  res.status(201).json(newUser);
});

export const login: RequestHandler<unknown, unknown, LoginProps, unknown> = asyncHandler(async (req, res) => {
  // * desc:    LOGIN USERS
  // * routes:  POST /api/users/login
  // * access:  PUBLIC

  const username = req.body.username;
  const password = req.body.password;

  // ! Check if username and password is not undefined
  if (!username || !password) {
    res.status(400);
    throw new Error(' - Parameters missing - ');
  }

  const user = await UsersModel.findOne({ username: username }).select('+password +email').exec();

  // ! Check if user exist
  if (!user) {
    res.status(401);
    throw new Error(' - Invalid username - ');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  // ! Check if password Exist
  if (!passwordMatch) {
    res.status(401);
    throw new Error(' - Invalid password - ');
  }

  req.session.userId = user._id;
  res.status(201).json(user);
});

export const getAuthenticatedUser: RequestHandler = asyncHandler(async (req, res) => {
  // * desc:    Authorization in users

  const user = await UsersModel.findById(req.session.userId).select('+email').exec();
  res.status(200).json(user);
});

export const logoutUser: RequestHandler = (req, res, next) => {
  // * Request logout for users and destroy there session

  req.session.destroy((error) => {
    if (error) next(error);
    res.sendStatus(200);
  });
};
