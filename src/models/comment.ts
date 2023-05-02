import { model, Model, Schema, Document } from 'mongoose';
import { Post } from './post';
import { User } from './user';

export const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    post: { type: Schema.Types.ObjectId, require: true, ref: 'Post' },
    content: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface Comment extends Document {
  user: User;
  post: Post;
  content: string;
  active?: boolean;
}

const CommentModel: Model<Comment> = model<Comment>('comments', commentSchema);

export default CommentModel;
