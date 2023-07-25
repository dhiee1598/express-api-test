import { Router } from 'express';
import * as GoalsHandler from './goals.handlers.js';

const router = Router();

router.route('/').get(GoalsHandler.getGoals).post(GoalsHandler.createGoal);

router
  .route('/:goalId')
  .get(GoalsHandler.getGoal)
  .patch(GoalsHandler.updateGoal)
  .delete(GoalsHandler.deleteGoal);

export default router;
