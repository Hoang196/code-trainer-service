import { model, Model, Schema, Document } from 'mongoose';

export const languageSchema = new Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface Language extends Document {
  name: string;
  active?: boolean;
}

const LanguageModel: Model<Language> = model<Language>('languages', languageSchema);

export default LanguageModel;
