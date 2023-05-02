import { UserExisted } from 'exceptions';
import { CategoryModel, ExerciseModel } from 'models';
import { Category } from 'models/category';
import { DEFAULT_PAGING } from 'utils/constants';

const getCategories = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ name: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, category] = await Promise.all([
    CategoryModel.count(queryParams),
    CategoryModel.find(queryParams).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: category,
  };
};

const createCategory = async (cat: Category) => {
  const { name } = cat;
  const checkExistence = await CategoryModel.findOne({ name: name, active: true });
  if (checkExistence) {
    throw new UserExisted();
  }
  const result = await CategoryModel.create(cat);
  return result;
};

const updateCategory = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await CategoryModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deleteCategory = async (request: any) => {
  const { id } = request.params;
  const { active } = request.body;
  const category = await CategoryModel.findOneAndUpdate({ _id: id }, { active: active });
  await ExerciseModel.updateMany({ category: id }, { active: active });
  return category;
};

export { getCategories, createCategory, updateCategory, deleteCategory };
