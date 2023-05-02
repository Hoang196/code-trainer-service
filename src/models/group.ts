import { model, Model, Schema, Document } from 'mongoose';
import { User } from './user';

export const groupSchema = new Schema(
  {
    admin: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface Group extends Document {
  admin: User;
  name: string;
  description: string;
  active?: boolean;
}

const GroupModel: Model<Group> = model<Group>('groups', groupSchema);

export default GroupModel;
