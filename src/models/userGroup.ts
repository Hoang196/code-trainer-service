import { model, Model, Schema, Document } from 'mongoose';
import { Group } from './group';
import { User } from './user';

export const userGroupSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    group: { type: Schema.Types.ObjectId, require: true, ref: 'Group' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export interface UserGroup extends Document {
  user: User;
  group: Group;
  active?: boolean;
}

const UserGroupModel: Model<UserGroup> = model<UserGroup>('user-group', userGroupSchema);

export default UserGroupModel;
