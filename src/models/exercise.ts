import { model, Model, Schema, Document } from 'mongoose';
import { Category } from './category';

export const exerciseSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    sample_input: { type: String, require: true },
    sample_output: { type: String, require: true },
    max_score: { type: Number, require: true },
    max_submission: { type: Number, default: 10 },
    name_function: { type: String, require: true },
    type_function: { type: String, require: true },
    params: { type: Array },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export interface Exercise extends Document {
  category: Category;
  title: string;
  description: string;
  difficulty: string;
  sample_input: string;
  sample_output: string;
  max_score: number;
  max_submission?: number;
  name_function: string;
  type_function: string;
  params?: any;
  active?: boolean;
}

const ExerciseModel: Model<Exercise> = model<Exercise>('exercises', exerciseSchema);

export default ExerciseModel;
