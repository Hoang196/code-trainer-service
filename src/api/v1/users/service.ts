import { UserExisted, UserNotFound } from 'exceptions';
import { ActionModel, CommentModel, PostModel, ScoreModel, UserGroupModel, UserModel } from 'models';
import { User } from 'models/user';
import { encrypt } from 'utils/aes';
import { DEFAULT_PAGING } from 'utils/constants';

const getUser = async (params: any) => {
  try {
    const { id } = params;
    if (id) {
      const data = await UserModel.findOne({ _id: id, active: true });
      return data;
    }
  } catch (error) {
    throw new UserNotFound();
  }
};

const getUsers = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ username: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, users] = await Promise.all([
    UserModel.count(queryParams),
    UserModel.find(queryParams).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: users,
  };
};

const createUser = async (user: User) => {
  const { email, password } = user;
  const checkEmail = await UserModel.findOne({ email: email, active: true });
  if (checkEmail) {
    throw new UserExisted();
  }
  const newPassword = encrypt(password);
  const newUser = {
    ...user,
    password: newPassword,
  };
  const result = await UserModel.create(newUser);
  return result;
};

const updateUser = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await UserModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deleteUser = async (request: any) => {
  const { id } = request.params;
  const { active } = request.body;
  const user = await UserModel.findOneAndUpdate({ _id: id }, { active: active });
  await Promise.all([
    UserGroupModel.updateMany({ user: id }, { active: active }),
    PostModel.updateMany({ user: id }, { active: active }),
    CommentModel.updateMany({ user: id }, { active: active }),
    ActionModel.updateMany({ user: id }, { active: active }),
    ScoreModel.updateMany({ user: id }, { active: active }),
  ]);
  return user;
};

export { getUser, getUsers, createUser, updateUser, deleteUser };
