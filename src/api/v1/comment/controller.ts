import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getComments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getComments(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createComment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createComment(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateComment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateComment(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteComment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteComment(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getComments, createComment, updateComment, deleteComment };
