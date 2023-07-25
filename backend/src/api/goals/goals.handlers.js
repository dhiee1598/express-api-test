import asyncHandler from 'express-async-handler';
import GoalsModel from './goals.model.js';
import { isValidObjectId } from 'mongoose';

export const getGoals = asyncHandler(async (req, res) => {
  // @ desc   -   GET ALL GOALS
  // @ routes -   GET /api/goals
  // @ access -   PRIVATE

  const goals = await GoalsModel.find();
  res.status(200).json(goals);
});

export const getGoal = asyncHandler(async (req, res) => {
  // @ desc   -   GET GOAL
  // @ routes -   GET /api/goals/:goalId
  // @ access -   PRIVATE

  // Check if goal id is valid
  if (!isValidObjectId(req.params.goalId)) {
    res.status(400);
    throw new Error('Not a valid Goal ID!');
  }

  //Check if goal id exist
  const goal = await GoalsModel.findById(req.params.goalId);
  if (!goal) {
    res.status(404);
    throw new Error('Goal not found!');
  }

  res.status(200).json(goal);
});

export const createGoal = asyncHandler(async (req, res) => {
  // @ desc   -   CREATE GOAL
  // @ routes -   POST /api/goals/
  // @ access -   PRIVATE

  // Check if there is required title is valid
  const title = req.body.title;
  if (!title) {
    res.status(400);
    throw new Error('Please add a text field!');
  }

  const create = await GoalsModel.create({
    title: title,
  });

  res.status(201).json(create);
});

export const updateGoal = asyncHandler(async (req, res) => {
  // @ desc   -   UPDATE GOAL
  // @ routes -   PATCH /api/goals/:goalId
  // @ access -   PRIVATE

  // Check if goal id is valid
  if (!isValidObjectId(req.params.goalId)) {
    res.status(400);
    throw new Error('Not a valid Goal ID!');
  }

  // Check if there is required title is valid
  const title = req.body.title;
  if (!title) {
    res.status(400);
    throw new Error('Please add a text field!');
  }

  //Check if goal id exist
  const goal = await GoalsModel.findById(req.params.goalId);
  if (!goal) {
    res.status(404);
    throw new Error('Goal not found!');
  }

  goal.title = title;
  const updated = await goal.save();

  res.status(200).json(updated);
});

export const deleteGoal = asyncHandler(async (req, res) => {
  // @ desc   -   DELETE GOAL
  // @ routes -   DELETE /api/goals/:goalId
  // @ access -   PRIVATE

  // Check if goal id is valid
  if (!isValidObjectId(req.params.goalId)) {
    res.status(400);
    throw new Error('Not a valid Goal ID!');
  }

  //Check if goal id exist and if there is a goal id then delete it in the collection
  const goal = await GoalsModel.findByIdAndDelete(req.params.goalId);
  if (!goal) {
    res.status(404);
    throw new Error('Goal not found!');
  }

  res.sendStatus(204);
});
