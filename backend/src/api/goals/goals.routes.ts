import express from 'express';
import * as GoalHandler from './goals.handler';

const router = express.Router();

router.get('/', GoalHandler.getGoals);

router.get('/:goalId', GoalHandler.getGoal);

router.post('/', GoalHandler.createGoal);

router.patch('/:goalId', GoalHandler.updateGoal);

router.delete('/:goalId', GoalHandler.deleteGoal);

export default router;
