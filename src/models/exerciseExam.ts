import { model, Model, Schema, Document } from 'mongoose';
import { Exam } from './exam';
import { Exercise } from './exercise';

export const exerciseExamSchema = new Schema(
  {
    exercise: { type: Schema.Types.ObjectId, require: true, ref: 'Exercise' },
    exam: { type: Schema.Types.ObjectId, require: true, ref: 'Exam' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface ExerciseExam extends Document {
  exercise: Exercise;
  exam: Exam;
  active?: boolean;
}

const ExerciseExamModel: Model<ExerciseExam> = model<ExerciseExam>('exercise-exam', exerciseExamSchema);

export default ExerciseExamModel;
