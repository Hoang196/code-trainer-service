import { UserExisted, UserNotFound } from 'exceptions';
import { ExerciseExamModel } from 'models';
import { ExerciseExam } from 'models/exerciseExam';
import { DEFAULT_PAGING } from 'utils/constants';

const getExerciseExam = async (params: any) => {
  try {
    const { id } = params;
    if (id) {
      const data = await ExerciseExamModel.findOne({ _id: id, active: true });
      return data;
    }
  } catch (error) {
    throw new UserNotFound();
  }
};

const getExerciseExams = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ username: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const [count, exerciseExam] = await Promise.all([
    ExerciseExamModel.count(queryParams),
    ExerciseExamModel.find(queryParams).skip(skip).limit(limit),
  ]);

  return {
    total: count,
    skip,
    data: exerciseExam,
  };
};

const createExerciseExam = async (exerExam: ExerciseExam) => {
  const { exercise, exam } = exerExam;
  const checkExerciseExam = await ExerciseExamModel.findOne({ exercise, exam, active: true });
  if (checkExerciseExam) {
    throw new UserExisted();
  }
  const result = await ExerciseExamModel.create(exerExam);
  return result;
};

const updateExerciseExam = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await ExerciseExamModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deleteExerciseExam = async (request: any) => {
  const { id } = request.params;
  const data = await ExerciseExamModel.findOneAndUpdate({ _id: id }, { active: false });
  return data;
};

export { getExerciseExam, getExerciseExams, createExerciseExam, updateExerciseExam, deleteExerciseExam };
