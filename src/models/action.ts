import { model, Model, Schema, Document } from 'mongoose';
import { Exercise } from './exercise';
import { User } from './user';

export const actionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    post: { type: Schema.Types.ObjectId, require: true, ref: 'Post' },
    action: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface Action extends Document {
  user: User;
  post: Exercise;
  action?: boolean;
  active?: boolean;
}

const ActionModel: Model<Action> = model<Action>('actions', actionSchema);

export default ActionModel;
