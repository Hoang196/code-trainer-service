import _ from 'lodash';
import { CategoryModel, ExerciseExamModel, ExerciseModel, LanguageModel, ScoreModel } from 'models';
import ExerciseLanguageModel from 'models/exerciseLanguage';
import TestCaseModel from 'models/testcase';
import { DEFAULT_PAGING } from 'utils/constants';

const getExercise = async (params: any) => {
  const { id } = params;
  if (id) {
    const data = await ExerciseModel.findOne({ _id: id, active: true });
    const [exeLanguage, category, testcase] = await Promise.all([
      ExerciseLanguageModel.find({ exercise: id, active: true }),
      CategoryModel.findOne({ _id: data?.category }),
      TestCaseModel.findOne({ exercise: data?._id }),
    ]);
    const languageId = exeLanguage?.map((el) => LanguageModel.findOne({ _id: el?.language }));
    const language = await Promise.all(languageId);
    const type_params = testcase?.params?.map((p: number) => {
      const checkType = testcase?.input?.includes('.');
      switch (p) {
        case 1:
          return checkType ? 'double' : 'int';
        case 2:
          return 'String';
        case 3:
          return checkType ? 'double[]' : 'int[]';
        case 4:
          return 'String[]';
        case 5:
          return checkType ? 'double[][]' : 'int[][]';
        case 6:
          return 'String[][]';
        default:
          return '';
      }
    });
    if (data) {
      return {
        id: data._id,
        category,
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        sample_input: data.sample_input,
        sample_output: data.sample_output,
        max_score: data.max_score,
        max_submission: data.max_submission,
        name_function: data.name_function,
        type_function: data.type_function,
        name_params: data.params,
        type_params,
        active: data.active,
        language,
      };
    }
  }
};

const getExercises = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ title: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const exercise = await ExerciseModel.find(queryParams).skip(skip).limit(limit);

  const languages = exercise?.map(async (exe: any) => {
    const exeLanguage = await ExerciseLanguageModel.find({ exercise: exe?._id });
    const testcase = await TestCaseModel.find({ exercise: exe?._id, active: true });
    const params = testcase?.[0]?.params;
    const languageId = exeLanguage?.map((el: any) => LanguageModel.findOne({ _id: el?.language }));
    const language = await Promise.all(languageId);
    return {
      data: {
        id: exe._id,
        category: exe.category,
        title: exe.title,
        description: exe.description,
        difficulty: exe.difficulty,
        sample_input: exe.sample_input,
        sample_output: exe.sample_output,
        max_score: exe.max_score,
        max_submission: exe.max_submission,
        name_function: exe.name_function,
        type_function: exe.type_function,
        params: exe.params,
        active: exe.active,
        language: language?.map((lan) => lan?.name),
      },
      testcase,
      params,
      language,
    };
  });
  const result = await Promise.all(languages);
  return result;
};

const getExercisesByCategoryId = async (request: any) => {
  try {
    const { id } = request.params;
    const queryParams: any = { category: id, active: true };
    const exercises = await ExerciseModel.find(queryParams);
    return exercises;
  } catch (err) {
    console.log(err);
  }
};

const getExercisesByLanguageId = async (request: any) => {
  const { id } = request.params;
  const queryParams: any = { language: id, active: true };
  const exercisesLanguage = await ExerciseLanguageModel.find(queryParams);
  const exeLanguageId = exercisesLanguage?.map((el) => ExerciseModel.findOne({ _id: el?.exercise }));
  const exercises = await Promise.all(exeLanguageId);
  return exercises;
};

const getExercisesSolved = async (request: any) => {
  const { id } = request.params;
  const listScores = await ScoreModel.find({ user: id, active: true });
  const listIdExercises = listScores.map((item) => ExerciseModel.findOne({ _id: item?.exercise, active: true }));
  const listExercises = await Promise.all(listIdExercises);
  let listIdCategory = listExercises.map((item) => item?.category?.toString());
  listIdCategory = _.uniq(listIdCategory);
  const exercisesSolved = listExercises.filter((item) => listIdCategory.includes(item?.category?.toString()));
  return exercisesSolved;
};

const getExercisesSearch = async (request: any) => {
  const { page, page_size, search } = request.query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ title: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const exercise = await ExerciseModel.find(queryParams).skip(skip).limit(limit);
  return exercise;
};

const createExercise = async (exer: any) => {
  const { data, testcase, params, language } = exer;
  const newExercise = await ExerciseModel.create(data);
  const newExeLanguage = language?.map((lan: any) =>
    ExerciseLanguageModel.create({ exercise: newExercise?._id, language: lan })
  );
  await Promise.all(newExeLanguage);
  const newTestCase = testcase?.map((test: any) =>
    TestCaseModel.create({
      exercise: newExercise?._id,
      params: params ? params : [],
      input: test?.input,
      output: test?.output,
    })
  );
  await Promise.all(newTestCase);
  return newExercise;
};

const updateExercise = async (request: any) => {
  const { id } = request.params;
  const { data, testcase, params, language } = request.body;
  const result = await Promise.all([
    ExerciseModel.findOneAndUpdate({ _id: id }, { ...data }),
    TestCaseModel.updateMany({ exercise: id }, { active: false }),
    ExerciseLanguageModel.updateMany({ exercise: id }, { active: false }),
  ]);
  const newTestCase = testcase.map((test: any) =>
    TestCaseModel.create({
      exercise: id,
      params: params,
      input: test?.input,
      output: test?.output,
    })
  );
  await Promise.all(newTestCase);
  const newExeLanguage = language?.map((lan: any) => ExerciseLanguageModel.create({ exercise: id, language: lan }));
  await Promise.all(newExeLanguage);
  return result;
};

const deleteExercise = async (request: any) => {
  const { id } = request.params;
  const { active } = request.body;
  const exercise = await ExerciseModel.findOneAndUpdate({ _id: id }, { active: active });
  await Promise.all([
    ExerciseExamModel.updateMany({ exercise: id }, { active: active }),
    ExerciseLanguageModel.updateMany({ exercise: id }, { active: active }),
    ScoreModel.updateMany({ exercise: id }, { active: active }),
  ]);
  return exercise;
};

export {
  getExercise,
  getExercises,
  getExercisesByCategoryId,
  getExercisesByLanguageId,
  getExercisesSolved,
  getExercisesSearch,
  createExercise,
  updateExercise,
  deleteExercise,
};
