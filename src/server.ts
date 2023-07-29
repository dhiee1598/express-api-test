import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';

const url = process.env.MONGO_URL as string;
const port = parseInt(process.env.PORT as string) || 5000;

mongoose.connect(url).then(() => {
  console.log('Connected Successfully!');
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
});
