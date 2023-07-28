import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import GoalsRouter from './api/goals/goals.routes.js';
import { notFoundError, handleError } from './middleware/errors.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome Lapugo' });
});

app.use('/api/goals', GoalsRouter);

app.use(notFoundError);
app.use(handleError);

export default app;
