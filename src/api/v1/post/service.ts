import { ActionModel, CommentModel, PostModel, UserModel } from 'models';
import { Post } from 'models/post';
import { DEFAULT_PAGING } from 'utils/constants';

const getPostsByStatus = async (query: any) => {
  const { search, status } = query;
  const queryParams: any = {
    status,
  };

  if (search) {
    queryParams.$or = [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }];
  }

  const listPost = await PostModel.find(queryParams);
  const listUserId = listPost?.map((post) => UserModel.findOne({ _id: post?.user }));
  const listUser = await Promise.all(listUserId);
  const posts = listPost?.map((post: any) => {
    return {
      id: post?._id,
      user: listUser?.find((user) => user?._id.toString() === post?.user.toString()),
      title: post?.title,
      content: post?.content,
      active: post?.active,
      status: post?.status,
      createdAt: post?.createdAt,
      updatedAt: post?.updatedAt,
    };
  });

  return posts;
};

const getPostsByUserId = async (request: any) => {
  const { id } = request.params;
  const { page, page_size } = request.query;
  const queryParams: any = { user: id, status: 'ACCEPTED', active: true };

  const skip = (page - 1) * DEFAULT_PAGING.page_size_post || 0;
  const limit = page_size || DEFAULT_PAGING.page_size_post;

  const [count, listPost] = await Promise.all([
    PostModel.count(queryParams),
    // eslint-disable-next-line prettier/prettier
    PostModel.find(queryParams).skip(skip).limit(limit).sort({"updatedAt": -1}),
  ]);

  const listActionId = listPost?.map((post) => ActionModel.find({ post: post?._id, action: true }));
  const listAction = await Promise.all(listActionId);
  const listCommentId = listPost?.map((post) => CommentModel.find({ post: post?._id, active: true }));
  const listComment = await Promise.all(listCommentId);
  const listUsersCommentId = listComment?.map((listCmt) => {
    return listCmt.map((cmt) => UserModel?.findOne({ _id: cmt?.user }));
  });
  const listUsersComment: any = [];
  for (let i = 0; i < listUsersCommentId?.length; i++) {
    const userComment = await Promise.all(listUsersCommentId?.[i]);
    listUsersComment.push(userComment);
  }
  const posts = listPost?.map((post: any, index: number) => {
    return {
      id: post?._id,
      title: post?.title,
      content: post?.content,
      comment: listComment?.[index]?.map((cmt: any, i) => {
        return {
          id: cmt?._id,
          post: cmt?.post,
          user: listUsersComment?.[index]?.[i],
          content: cmt?.content,
          createdAt: cmt?.createdAt,
          updatedAt: cmt?.updatedAt,
        };
      }),
      like: listAction?.[index]?.length,
      action: !!listAction?.[index]?.find((action: any) => action?.user?.toString() === id) || false,
      active: post?.active,
      status: post?.status,
      createdAt: post?.createdAt,
      updatedAt: post?.updatedAt,
    };
  });

  return {
    total: count,
    skip,
    data: posts,
  };
};

const getPost = async (request: any) => {
  const { id } = request.params;

  const post = await PostModel.findOne({ _id: id, status: 'ACCEPTED' });

  return post;
};

const getPosts = async (request: any) => {
  const { page, page_size, search } = request.query;
  const { id } = request.params;
  const queryParams: any = { status: 'ACCEPTED', active: true };

  if (search) {
    queryParams.$or = [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }];
  }
  const skip = (page - 1) * DEFAULT_PAGING.page_size_post || 0;
  const limit = page_size || DEFAULT_PAGING.page_size_post;

  const [count, listPost] = await Promise.all([
    PostModel.count(queryParams),
    // eslint-disable-next-line prettier/prettier
    PostModel.find(queryParams).skip(skip).limit(limit).sort({"updatedAt": -1}),
  ]);

  const listUserId = listPost?.map((post) => UserModel.findOne({ _id: post?.user }));
  const listUser = await Promise.all(listUserId);
  const listActionId = listPost?.map((post) => ActionModel.find({ post: post?._id, action: true }));
  const listAction = await Promise.all(listActionId);
  const listCommentId = listPost?.map((post) => CommentModel.find({ post: post?._id, active: true }));
  const listComment = await Promise.all(listCommentId);
  const listUsersCommentId = listComment?.map((listCmt) => {
    return listCmt.map((cmt) => UserModel?.findOne({ _id: cmt?.user }));
  });
  const listUsersComment: any = [];
  for (let i = 0; i < listUsersCommentId?.length; i++) {
    const userComment = await Promise.all(listUsersCommentId?.[i]);
    listUsersComment.push(userComment);
  }
  const posts = listPost?.map((post: any, index: number) => {
    return {
      id: post?._id,
      user: listUser?.find((user) => user?._id.toString() === post?.user.toString()) || {},
      title: post?.title,
      content: post?.content,
      comment: listComment?.[index]?.map((cmt: any, i) => {
        return {
          id: cmt?._id,
          post: cmt?.post,
          user: listUsersComment?.[index]?.[i],
          content: cmt?.content,
          createdAt: cmt?.createdAt,
          updatedAt: cmt?.updatedAt,
        };
      }),
      like: listAction?.[index]?.length,
      action: !!listAction?.[index]?.find((action: any) => action?.user?.toString() === id) || false,
      active: post?.active,
      status: post?.status,
      createdAt: post?.createdAt,
      updatedAt: post?.updatedAt,
    };
  });

  return {
    total: count,
    skip,
    data: posts,
  };
};

const createPost = async (post: Post) => {
  const result = await PostModel.create(post);
  return result;
};

const updatePost = async (request: any) => {
  const { id } = request.params;
  const dataUpdate = request.body;
  const data = await PostModel.findOneAndUpdate({ _id: id }, { ...dataUpdate });
  return data;
};

const deletePost = async (request: any) => {
  const { id } = request.params;
  const data = await PostModel.findOneAndUpdate({ _id: id }, { active: false });
  await Promise.all([
    CommentModel.updateMany({ post: id }, { active: false }),
    ActionModel.updateMany({ post: id }, { active: false }),
  ]);
  return data;
};

export { getPostsByStatus, getPostsByUserId, getPost, getPosts, createPost, updatePost, deletePost };
