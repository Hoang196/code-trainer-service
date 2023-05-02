import { ActionModel } from 'models';
import { Action } from 'models/action';
import { DEFAULT_PAGING } from 'utils/constants';

const getActions = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ username: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, action] = await Promise.all([
    ActionModel.count(queryParams),
    ActionModel.find(queryParams).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: action,
  };
};

const createAction = async (data: Action) => {
  const { user, post, action } = data;
  const checkAction = await ActionModel.findOne({ user: user, post: post });
  let result;
  if (checkAction) {
    result = await ActionModel.findOneAndUpdate({ user: user, post: post }, { action: action });
  } else {
    result = await ActionModel.create(data);
  }
  return result;
};

const updateAction = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await ActionModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deleteAction = async (request: any) => {
  const { id } = request.params;
  const data = await ActionModel.findOneAndUpdate({ _id: id }, { active: false });
  return data;
};

export { getActions, createAction, updateAction, deleteAction };
