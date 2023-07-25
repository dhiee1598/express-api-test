import { Schema, model } from 'mongoose';

const goalSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model('Goals', goalSchema);
