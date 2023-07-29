import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import GoalRoutes from './api/goals/goals.routes';
import UserRoutes from './api/users/users.routes';
import { notFound, errorHandler } from './middlewares/error';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { requiredAuth } from './middlewares/userAuth';

const app = express();
const secret = process.env.SESSION_SECRET as string;
const url = process.env.MONGO_URL as string;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: url,
    }),
  })
);

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello World!' });
});

app.use('/api/goals', requiredAuth, GoalRoutes);
app.use('/api/users', UserRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
