import { UserExisted } from 'exceptions';
import { ExamModel, ExerciseExamModel, ExerciseModel, GroupModel, UserGroupModel, UserModel } from 'models';
import { DEFAULT_PAGING } from 'utils/constants';

const getGroup = async (request: any) => {
  const { id } = request.params;
  if (id) {
    const [group, listExam, userGroup] = await Promise.all([
      GroupModel.findOne({ _id: id }),
      ExamModel.find({ group: id, active: true }),
      UserGroupModel.find({ group: id, active: true }),
    ]);
    const listIdExam = listExam?.map((item: any) => ExerciseExamModel.find({ exam: item?._id, active: true }));
    const listExerExam = await Promise.all(listIdExam);
    const listIdExer = [];
    for (let i = 0; i < listExerExam?.length; i++) {
      for (let j = 0; j < listExerExam?.[i]?.length; j++) {
        listIdExer.push(ExerciseModel.findOne({ _id: listExerExam?.[i]?.[j]?.exercise }));
      }
    }
    const listExer = await Promise.all(listIdExer);
    const exerciseInExam = listExam?.map((item: any, index: number) => {
      const exeExams = listExerExam?.[index]?.filter((ee: any) => item?._id?.toString() === ee?.exam?.toString());
      const listIdExe = exeExams?.map((le: any) => le?.exercise?.toString());
      const exercises = listIdExe?.map((lie: any) => listExer?.find((le: any) => le?._id?.toString() === lie));
      return {
        name: item?.name,
        exercise: exercises,
      };
    });
    const listIdUser = userGroup.map((item: any) => UserModel.findOne({ _id: item?.user }));
    const userExisted = await Promise.all(listIdUser);
    const allUser = await UserModel.find({ active: true });
    const userNotExisted = allUser?.map((user) => {
      if (!userExisted?.find((u) => user?._id?.toString() === u?._id?.toString())) {
        return user;
      }
    });
    return {
      group,
      exercises: exerciseInExam,
      exam: listExam,
      userExisted,
      userNotExisted,
    };
  }
};

const getGroupsByUserId = async (request: any) => {
  const { id } = request.params;
  if (id) {
    const userGroup = await UserGroupModel.find({ user: id, active: true });
    const listIdGroup = userGroup.map((ug: any) => GroupModel.findOne({ _id: ug?.group }));
    const group = await Promise.all(listIdGroup);
    return group;
  }
};

const getGroups = async (query: any) => {
  const { page, page_size, search } = query;
  const queryParams: any = {};

  if (search) {
    queryParams.$or = [{ name: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size || 0;
  const limit = page_size || DEFAULT_PAGING.page_size;

  const groups = await GroupModel.find(queryParams).skip(skip).limit(limit);
  const listUserId = groups?.map((group) => UserModel.findOne({ _id: group?.admin }));
  const listUser = await Promise.all(listUserId);
  const listUserGroup = groups?.map((item: any) => UserGroupModel.find({ group: item?._id, active: true }));
  const userGroup = await Promise.all(listUserGroup);
  const listExamGroup = groups?.map((item: any) => ExamModel.find({ group: item?._id, active: true }));
  const listExams = await Promise.all(listExamGroup);
  const result = groups?.map((group: any, index) => {
    const members = userGroup?.[index]?.filter(
      (usergroup: any) => usergroup?.group?.toString() === group?._id?.toString()
    );
    return {
      id: group?._id,
      admin: listUser?.find((user) => user?._id?.toString() === group?.admin?.toString()),
      name: group?.name,
      description: group?.description,
      members: members?.length,
      exams: listExams?.[index]?.length,
      active: group?.active,
    };
  });

  return result;
};

const createGroup = async (data: any) => {
  const { group, user } = data;
  const checkExistence = await GroupModel.findOne({ admin: group?.admin, name: group?.name, active: true });
  if (checkExistence) {
    throw new UserExisted();
  }
  let result = await GroupModel.create(group);
  if (user?.length > 0 && result) {
    const userGroup = user?.map((u: any) => UserGroupModel.create({ user: u, group: result?._id }));
    await Promise.all(userGroup);
  }
  return result;
};

const updateGroup = async (request: any) => {
  const { id } = request.params;
  const { group, userExisted } = request.body;
  let result: any;
  if (group) {
    result = await GroupModel.findOneAndUpdate({ _id: id }, { ...group });
  }
  const data = await UserGroupModel.updateMany({ group: id }, { active: false });
  if (data && userExisted?.length > 0) {
    const userGroup = userExisted?.map((u: any) => UserGroupModel.create({ user: u, group: id }));
    result = await Promise.all(userGroup);
  }
  // if (userNotExisted?.length > 0) {
  //   const userGroup = userNotExisted?.map((u: any) =>
  //     UserGroupModel.findOneAndUpdate({ user: u, group: id }, { active: false })
  //   );
  //   result = await Promise.all(userGroup);
  // }
  return result;
};

const deleteGroup = async (request: any) => {
  const { id } = request.params;
  const { active } = request.body;
  const data = await GroupModel.findOneAndUpdate({ _id: id }, { active: active });
  await Promise.all([
    ExamModel.updateMany({ group: id }, { active: active }),
    UserGroupModel.updateMany({ group: id }, { active: active }),
  ]);
  return data;
};

export { getGroup, getGroupsByUserId, getGroups, createGroup, updateGroup, deleteGroup };
