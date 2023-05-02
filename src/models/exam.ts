import { model, Model, Schema, Document } from 'mongoose';
import { Group } from './group';

export const examSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, require: true, ref: 'Group' },
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface Exam extends Document {
  group: Group;
  name: string;
  active?: boolean;
}

const ExamModel: Model<Exam> = model<Exam>('exams', examSchema);

export default ExamModel;
