import { model, Model, Schema, Document } from 'mongoose';
import { Exercise } from './exercise';
import { Language } from './language';

export const exerciseLanguageSchema = new Schema(
  {
    exercise: { type: Schema.Types.ObjectId, require: true, ref: 'Exercise' },
    language: { type: Schema.Types.ObjectId, require: true, ref: 'Language' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface ExerciseLanguage extends Document {
  exercise: Exercise;
  language: Language;
  active?: boolean;
}

const ExerciseLanguageModel: Model<ExerciseLanguage> = model<ExerciseLanguage>(
  'exercise-languages',
  exerciseLanguageSchema
);

export default ExerciseLanguageModel;
