import { model, Model, Schema, Document } from 'mongoose';

export const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface Category extends Document {
  name: string;
  active?: boolean;
}

const CategoryModel: Model<Category> = model<Category>('categories', categorySchema);

export default CategoryModel;
