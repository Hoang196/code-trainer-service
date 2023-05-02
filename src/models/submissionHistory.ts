import { model, Model, Schema, Document } from 'mongoose';
import { Exercise } from './exercise';
import { User } from './user';

export const submissionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    exercise: { type: Schema.Types.ObjectId, require: true, ref: 'Exercise' },
    language: { type: String, require: true },
    content: { type: String, require: true },
    result: { type: Number, require: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface SubmissionHistory extends Document {
  user: User;
  exercise: Exercise;
  language: string;
  content: string;
  result: number;
  active?: boolean;
}

const SubmissionHistoryModel: Model<SubmissionHistory> = model<SubmissionHistory>(
  'submission-histories',
  submissionSchema
);

export default SubmissionHistoryModel;
