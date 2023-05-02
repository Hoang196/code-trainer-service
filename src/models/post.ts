import { model, Model, Schema, Document } from 'mongoose';
import { User } from './user';

export const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    title: { type: String, require: true },
    content: { type: String, required: true },
    status: { type: String, default: 'PENDING' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface Post extends Document {
  user: User;
  title: string;
  content: string;
  status?: string;
  active?: boolean;
}

const PostModel: Model<Post> = model<Post>('posts', postSchema);

export default PostModel;
