import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getPostsByStatus = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getPostsByStatus(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getPostsByUserId = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getPostsByUserId(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getPost = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getPost(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getPosts = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getPosts(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createPost = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createPost(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updatePost = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updatePost(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deletePost = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deletePost(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getPostsByStatus, getPostsByUserId, getPost, getPosts, createPost, updatePost, deletePost };
