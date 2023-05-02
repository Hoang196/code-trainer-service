import { model, Model, Schema, Document } from 'mongoose';
import { Exercise } from './exercise';

export const testCaseSchema = new Schema(
  {
    exercise: { type: Schema.Types.ObjectId, require: true, ref: 'Exercise' },
    params: { type: Array, require: true },
    input: { type: String, required: true },
    output: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface TestCase extends Document {
  exercise: Exercise;
  params: any;
  input: string;
  output: string;
  active?: boolean;
}

const TestCaseModel: Model<TestCase> = model<TestCase>('test-cases', testCaseSchema);

export default TestCaseModel;
