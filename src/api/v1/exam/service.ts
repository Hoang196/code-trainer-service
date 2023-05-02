import { UserExisted } from 'exceptions';
import { ExamModel, ExerciseExamModel, ExerciseModel, GroupModel, UserGroupModel } from 'models';
import { DEFAULT_PAGING } from 'utils/constants';

const getExamsByUserId = async (request: any) => {
  const { id } = request.params;
  const userGroup = await UserGroupModel.find({ user: id });
  const listIdGroup = userGroup.map((item) => ExamModel.find({ group: item?.group }));
  const [listExams] = await Promise.all(listIdGroup);
  return listExams;
};

const getExam = async (request: any) => {
  const { id } = request.params;
  if (id) {
    const exam = await ExamModel.findOne({ _id: id });
    const listExerExam = await ExerciseExamModel.find({ exam: id });
    const group = await GroupModel.findOne({ _id: exam?.group });
    const listIdExercises = listExerExam.map((item) => ExerciseModel.findOne({ _id: item?.exercise }));
    const listExercises = await Promise.all(listIdExercises);
    return {
      group,
      name: exam?.name,
      listExercises,
    };
  }
};

const getExams = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ name: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const listExam = await ExamModel.find(queryParams).skip(skip).limit(limit);
  const listGroupId = listExam?.map((exam) => GroupModel.findOne({ _id: exam?.group }));
  const listExerExam = listExam?.map((exam) => ExerciseExamModel.find({ exam: exam?._id, active: true }));
  const listExer = await Promise.all(listExerExam);
  const listGroup = await Promise.all(listGroupId);
  const exams = listExam?.map((exam: any, index) => {
    return {
      id: exam?._id,
      group: listGroup?.find((group) => group?._id.toString() === exam?.group.toString()),
      name: exam?.name,
      exercises: listExer[index]?.length,
      active: exam?.active,
      createdAt: exam?.createdAt,
      updatedAt: exam?.updatedAt,
    };
  });

  return exams;
};

const createExam = async (exam: any) => {
  const { group, name, exerciseId } = exam;
  const checkExistence = await ExamModel.findOne({ group: group, name: name, active: true });
  if (checkExistence) {
    throw new UserExisted();
  }
  const newExam = await ExamModel.create({ group, name });
  const addExercise = exerciseId.map((item: any) => ExerciseExamModel.create({ exercise: item, exam: newExam?._id }));
  await Promise.all(addExercise);
  return newExam;
};

const updateExam = async (request: any) => {
  const { id } = request.params;
  const { group, name, exerciseId } = request.body;
  const data = await ExamModel.findOneAndUpdate({ _id: id }, { group: group, name: name });
  await ExerciseExamModel.updateMany({ exercise: id }, { active: false });
  const addExercise = exerciseId.map((item: any) => ExerciseExamModel.create({ exercise: item, exam: id }));
  await Promise.all(addExercise);
  return data;
};

const deleteExam = async (request: any) => {
  const { id } = request.params;
  const { active } = request.body;
  const data = await ExamModel.findOneAndUpdate({ _id: id }, { active: active });
  await ExerciseExamModel.updateMany({ exam: id }, { active: active });
  return data;
};

export { getExamsByUserId, getExam, getExams, createExam, updateExam, deleteExam };
