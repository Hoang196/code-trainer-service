import { model, Model, Schema, Document } from 'mongoose';

export const userSchema = new Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: String, default: '' },
    gender: { type: String, default: '' },
    role: { type: String, default: 'USER' },
    avatar: { type: String, default: '' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface User extends Document {
  email: string;
  username: string;
  password: string;
  dob?: string;
  gender?: string;
  role?: string;
  avatar?: string;
  active?: boolean;
}

const UserModel: Model<User> = model<User>('users', userSchema);

export default UserModel;
