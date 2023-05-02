import { CommentModel, UserModel } from 'models';
import { Comment } from 'models/comment';

const getComments = async (query: any) => {
  const comment = await CommentModel.find({ active: true });

  return comment;
};

const createComment = async (comment: Comment) => {
  const { post } = comment;
  const newComment = await CommentModel.create(comment);
  let result: any = [];
  if (newComment) {
    const listComment = await CommentModel.find({ post: post });
    const listUserId = listComment?.map((cmt: any) => UserModel.findOne({ _id: cmt?.user }));
    const listUser = await Promise.all(listUserId);
    result = listComment?.map((listCmt: any) => {
      return {
        id: listCmt?._id,
        post: listCmt?.post,
        user: listUser?.find((user: any) => user?._id?.toString() === listCmt?.user?.toString()) || {},
        content: listCmt?.content,
        createdAt: listCmt?.createdAt,
        updatedAt: listCmt?.updatedAt,
      };
    });
  }
  return result;
};

const updateComment = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const result = await CommentModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  let data = {};
  if (result) {
    const comment: any = await CommentModel.findOne({ _id: id });
    const user = await UserModel.findOne({ _id: result?.user });
    data = {
      user,
      post: comment?.post,
      content: comment?.content,
      active: comment?.active,
      createdAt: comment?.createdAt,
      updatedAt: comment?.updatedAt,
    };
  }
  return data;
};

const deleteComment = async (request: any) => {
  const { id } = request.params;
  const data = await CommentModel.findOneAndUpdate({ _id: id }, { active: false });
  return data;
};

export { getComments, createComment, updateComment, deleteComment };
