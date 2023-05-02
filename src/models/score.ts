import { model, Model, Schema, Document } from 'mongoose';
import { Exercise } from './exercise';
import { User } from './user';

export const scoreSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    exercise: { type: Schema.Types.ObjectId, require: true, ref: 'Exercise' },
    score: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface Score extends Document {
  user: User;
  exercise: Exercise;
  score: number;
  active?: boolean;
}

const ScoreModel: Model<Score> = model<Score>('scores', scoreSchema);

export default ScoreModel;
