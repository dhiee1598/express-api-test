import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import GoalModel from './goals.model';
import { isValidObjectId } from 'mongoose';
import { GoalProps, GoalIdProps } from '../../@types/goalProps';
import { assertIsDefined } from '../../util/assertIsDefined';

export const getGoals: RequestHandler = asyncHandler(async (req, res) => {
  // * desc:    GET ALL GOALS
  // * routes:  GET /api/goals
  // * access:  PRIVATE

  const authenticatedUserId = req.session.userId;

  assertIsDefined(authenticatedUserId);

  const goals = await GoalModel.find({ userId: authenticatedUserId }).exec();

  res.status(200);
  res.json(goals);
});

export const getGoal: RequestHandler<GoalIdProps, unknown, unknown, unknown> = asyncHandler(async (req, res) => {
  // * desc:    GET A SINGLE GOAL
  // * routes:  GET /api/goals/:goalId
  // * access:  PRIVATE

  const authenticatedUserId = req.session.userId;
  assertIsDefined(authenticatedUserId);

  const goalId = req.params.goalId;

  // ! Check if the Goal ID is valid
  if (!isValidObjectId(goalId)) {
    res.status(400);
    throw new Error(' - Invalid Goal ID - ');
  }

  const goal = await GoalModel.findById(goalId).exec();

  // ! Check if the Goal ID exist
  if (!goal) {
    res.status(404);
    throw new Error(' - Goal Not Found! - ');
  }

  // ! Check if the goalUserId is belong to the user
  if (!goal.userId.equals(authenticatedUserId)) {
    res.status(401);
    throw new Error(' - Cannot access notes - ');
  }

  res.status(200);
  res.json(goal);
});

export const createGoal: RequestHandler<unknown, unknown, GoalProps, unknown> = asyncHandler(async (req, res) => {
  // * desc:    CREATE A GOAL
  // * routes:  POST /api/goals
  // * access:  PRIVATE

  const title = req.body.title;

  // ! Check if the title is valid
  if (!title) {
    res.status(400);
    throw new Error(' - Please add a title - ');
  }

  const authenticatedUserId = req.session.userId;
  assertIsDefined(authenticatedUserId);

  const goal = await GoalModel.create({
    userId: authenticatedUserId,
    title: title,
  });

  res.status(201);
  res.json(goal);
});

export const updateGoal: RequestHandler<GoalIdProps, unknown, GoalProps, unknown> = asyncHandler(async (req, res) => {
  // * desc:    UPDATE A GOAL
  // * routes:  PATCH /api/goals/:goalId
  // * access:  PRIVATE

  const title = req.body.title;
  const goalId = req.params.goalId;
  const authenticatedUserId = req.session.userId;
  assertIsDefined(authenticatedUserId);

  // ! Check if the Goal ID is valid
  if (!isValidObjectId(goalId)) {
    res.status(400);
    throw new Error(' - Invalid Goal ID - ');
  }

  const goal = await GoalModel.findById(goalId).exec();

  // ! Check if the Goal ID exist
  if (!goal) {
    res.status(404);
    throw new Error(' - Goal Not Found! - ');
  }

  // ! Check if the goalUserId is belong to the user
  if (!goal.userId.equals(authenticatedUserId)) {
    res.status(401);
    throw new Error(' - Cannot access notes - ');
  }

  // ! Check if the title is valid or not
  if (!title) {
    res.status(400);
    throw new Error(' - Please add a title - ');
  }

  goal.title = title;
  const updated = await goal.save();
  res.status(200).json(updated);
});

export const deleteGoal: RequestHandler<GoalIdProps, unknown, unknown, unknown> = asyncHandler(async (req, res) => {
  // * desc:    DELETE A GOAL
  // * routes:  DELETE /api/goals/:goalId
  // * access:  PRIVATE

  const goalId = req.params.goalId;
  const authenticatedUserId = req.session.userId;
  assertIsDefined(authenticatedUserId);

  // ! Check if the Goal ID is valid
  if (!isValidObjectId(goalId)) {
    res.status(400);
    throw new Error(' - Invalid Goal ID - ');
  }

  const goal = await GoalModel.findById(req.params.goalId).exec();

  // ! Check if goal id exist and if there is a goal id then delete it in the collection
  if (!goal) {
    res.status(404);
    throw new Error(' - Goal Not Found! - ');
  }

  // ! Check if the goalUserId is belong to the user
  if (!goal.userId.equals(authenticatedUserId)) {
    res.status(401);
    throw new Error(' - Cannot access notes - ');
  }

  await goal.deleteOne();

  res.sendStatus(204);
});
