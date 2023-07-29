import { InferSchemaType, Schema, model } from 'mongoose';

const goalModel = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

type Goal = InferSchemaType<typeof goalModel>;

export default model<Goal>('Goal', goalModel);
