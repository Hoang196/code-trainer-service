import { ScoreModel } from 'models';
import { Score } from 'models/score';
import { DEFAULT_PAGING } from 'utils/constants';

const getScores = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ username: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, score] = await Promise.all([
    ScoreModel.count(queryParams),
    ScoreModel.find(queryParams).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: score,
  };
};

const createScore = async (score: Score) => {
  const result = await ScoreModel.create(score);
  return result;
};

const updateScore = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await ScoreModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deleteScore = async (request: any) => {
  const { id } = request.params;
  const { active } = request.body;
  const data = await ScoreModel.findOneAndUpdate({ _id: id }, { active: active });
  return data;
};

export { getScores, createScore, updateScore, deleteScore };
