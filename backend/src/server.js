import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mongoose Connected!');
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  })
  .catch(console.error);
