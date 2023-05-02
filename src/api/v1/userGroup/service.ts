import { UserExisted, UserNotFound } from 'exceptions';
import { UserGroupModel } from 'models';
import { UserGroup } from 'models/userGroup';
import { DEFAULT_PAGING } from 'utils/constants';

const getUserGroup = async (params: any) => {
  try {
    const { id } = params;
    if (id) {
      const data = await UserGroupModel.findOne({ _id: id, active: true });
      return data;
    }
  } catch (error) {
    throw new UserNotFound();
  }
};

const getUserGroups = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ username: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, userGroup] = await Promise.all([
    UserGroupModel.count(queryParams),
    UserGroupModel.find(queryParams).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: userGroup,
  };
};

const createUserGroup = async (userGroup: UserGroup) => {
  const { user, group } = userGroup;
  const checkUserGroup = await UserGroupModel.findOne({ user, group, active: true });
  if (checkUserGroup) {
    throw new UserExisted();
  }
  const result = await UserGroupModel.create(userGroup);
  return result;
};

const updateUserGroup = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await UserGroupModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deleteUserGroup = async (request: any) => {
  const { id } = request.params;
  const data = await UserGroupModel.findOneAndUpdate({ _id: id }, { active: false });
  return data;
};

export { getUserGroup, getUserGroups, createUserGroup, updateUserGroup, deleteUserGroup };
