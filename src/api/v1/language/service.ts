import { UserExisted } from 'exceptions';
import { LanguageModel } from 'models';
import ExerciseLanguageModel from 'models/exerciseLanguage';
import { Language } from 'models/language';
import { DEFAULT_PAGING } from 'utils/constants';

const getLanguages = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ name: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, language] = await Promise.all([
    LanguageModel.count(queryParams),
    LanguageModel.find(queryParams).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: language,
  };
};

const createLanguage = async (lang: Language) => {
  const { name } = lang;
  const checkExistence = await LanguageModel.findOne({ name: name, active: true });
  if (checkExistence) {
    throw new UserExisted();
  }
  const result = await LanguageModel.create(lang);
  return result;
};

const updateLanguage = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await LanguageModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deleteLanguage = async (request: any) => {
  const { id } = request.params;
  const { active } = request.body;
  const data = await LanguageModel.findOneAndUpdate({ _id: id }, { active: active });
  await ExerciseLanguageModel.updateMany({ language: id }, { active: active });
  return data;
};

export { getLanguages, createLanguage, updateLanguage, deleteLanguage };
