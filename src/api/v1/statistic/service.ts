import {
  CategoryModel,
  ExerciseModel,
  GroupModel,
  LanguageModel,
  PostModel,
  ScoreModel,
  SubmissionHistoryModel,
  UserGroupModel,
  UserModel,
} from 'models';
import _ from 'lodash';
import { DEFAULT_PAGING } from 'utils/constants';
import ExerciseLanguageModel from 'models/exerciseLanguage';

const getRanks = async (request: any) => {
  const listUser = await UserModel.find({ role: 'USER' });
  const listScore = await ScoreModel.find({ active: true });
  const scoreOfUser = listUser?.map((userItem) => {
    return {
      id: userItem._id,
      userName: userItem?.username,
      email: userItem?.email,
      exercises: listScore?.reduce((total, scoreItem) => {
        return userItem._id.toString() === scoreItem?.user.toString() ? (total += 1) : total;
      }, 0),
      totalScore: listScore?.reduce((total, scoreItem) => {
        return userItem._id.toString() === scoreItem?.user.toString() ? (total += scoreItem.score) : total;
      }, 0),
      status: userItem?.active,
    };
  });
  const rankOfUser = scoreOfUser?.sort((a: any, b: any) => b.totalScore - a.totalScore);
  const result = rankOfUser?.map((item: any, index: number) => {
    return {
      ...item,
      rank: index + 1,
      key: index,
    };
  });
  return result;
};

const getDash = async (request: any) => {
  const { id } = request.params;
  const [listScores, listTopics, listLanguage, listUserGroups] = await Promise.all([
    ScoreModel.find({ user: id, active: true }),
    CategoryModel.find({ acitve: true }),
    LanguageModel.find({ active: true }),
    UserGroupModel.find({ user: id, active: true }),
  ]);
  const listIdGroup = listUserGroups.map((item) => GroupModel.findOne({ _id: item?.group }));
  const listGroup = await Promise.all(listIdGroup);
  const formatGroup = listGroup?.map((gr) => {
    return {
      id: gr?._id?.toString(),
      name: gr?.name,
      description: gr?.description,
    };
  });
  const listIdExercises = listScores.map((item) => ExerciseModel.findOne({ _id: item?.exercise }));
  const listExercises = await Promise.all(listIdExercises);
  let listIdCategory = listExercises.map((item) => item?.category?.toString());
  listIdCategory = _.uniq(listIdCategory);
  const listWorking: any = [];
  for (let i = 0; i < listIdCategory?.length; i++) {
    const totalExercises = await ExerciseModel.find({ category: listIdCategory[i] });
    const exercisesSolved = listExercises.filter(
      (item) => item?.category?.toString() === listIdCategory[i]?.toString()
    );
    const working = listTopics.filter((item) => item?._id?.toString() === listIdCategory[i]);
    listWorking.push({
      id: working[0]?._id,
      name: working[0]?.name,
      total: totalExercises?.length,
      solved: exercisesSolved?.length,
      active: working[0]?.active,
    });
  }
  return {
    working: listWorking,
    topic: listTopics,
    language: listLanguage,
    group: _.uniqBy(formatGroup, 'id'),
  };
};

const getHistory = async (request: any) => {
  const { id } = request.params;
  const user = await UserModel.findOne({ _id: id });
  // eslint-disable-next-line prettier/prettier
  const histories = await SubmissionHistoryModel.find({ user: id }).sort({"createdAt": -1});
  const listExerciseId = histories.map((his) => ExerciseModel.findOne({ _id: his.exercise }));
  const listExercise = await Promise.all(listExerciseId);
  const res = histories?.map((his: any, index) => {
    const exercise = listExercise.find((exe) => his?.exercise?.toString() === exe?._id?.toString());
    const result = exercise?.max_score === his.result ? 'Accepted' : 'Wrong Answer';
    const score = his.result;
    return {
      user: user.username,
      email: user.email,
      exercise: exercise.title,
      language: his.language,
      content: his.content,
      result,
      score,
      time: his?.createdAt?.toString()?.slice(0, 24),
      key: index,
    };
  });
  return res;
};

const getHistories = async (request: any) => {
  const { page, page_size, search } = request.query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ language: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  // eslint-disable-next-line prettier/prettier
  const histories = await SubmissionHistoryModel.find(queryParams).skip(skip).limit(limit).sort({"createdAt": -1});
  const listUserId = histories.map((his) => UserModel.findOne({ _id: his.user }));
  const listUser = await Promise.all(listUserId);
  const listExerciseId = histories.map((his) => ExerciseModel.findOne({ _id: his.exercise }));
  const listExercise = await Promise.all(listExerciseId);
  const result = histories?.map((his) => {
    const user = listUser.find((u) => his?.user?.toString() === u?._id?.toString());
    const exercise = listExercise.find((exe) => his?.exercise?.toString() === exe?._id?.toString());
    return {
      user: user.username,
      email: user.email,
      exercise: exercise.title,
      language: his.language,
      content: his.content,
      result: his.result,
    };
  });
  return result;
};

const getDashboard = async () => {
  const languages = await LanguageModel.find({ active: true });
  const listLanguageId = languages?.map((lan) => ExerciseLanguageModel.find({ language: lan?._id, active: true }));
  const listExercise = await Promise.all(listLanguageId);
  const language = languages?.map((lan: any, index: number) => {
    return {
      name: lan?.name,
      value: listExercise?.[index]?.length,
    };
  });

  const [postsPending, postsAccepted, postsRejected] = await Promise.all([
    PostModel.find({ status: 'PENDING', active: true }),
    PostModel.find({ status: 'ACCEPTED', active: true }),
    PostModel.find({ status: 'REJECTED', active: true }),
  ]);

  const categories = await CategoryModel.find({ active: true });
  const liseCategoryId = categories?.map((cat) => ExerciseModel.find({ category: cat?._id, active: true }));
  const exercises = await Promise.all(liseCategoryId);
  const category = categories?.map((cat: any, index: number) => {
    return {
      name: cat?.name,
      value: exercises?.[index]?.length,
    };
  });

  const [userExisted, userNotExisted] = await Promise.all([
    await UserModel.find({ active: true }),
    await UserModel.find({ active: false }),
  ]);

  return {
    language,
    post: [
      { name: 'Chờ duyệt', value: postsPending?.length },
      { name: 'Đã duyệt', value: postsAccepted?.length },
      { name: 'Từ chối duyệt', value: postsRejected?.length },
    ],
    category,
    user: [
      { name: 'Người dùng đang hoạt động', value: userExisted?.length },
      { name: 'Người dùng ngừng hoạt động', value: userNotExisted?.length },
    ],
  };
};

export { getRanks, getDash, getHistory, getHistories, getDashboard };
