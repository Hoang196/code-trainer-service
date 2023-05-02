import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getGroup = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getGroup(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getGroupsByUserId = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getGroupsByUserId(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getGroups = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getGroups(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createGroup = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createGroup(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateGroup = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateGroup(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteGroup = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteGroup(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getGroup, getGroupsByUserId, getGroups, createGroup, updateGroup, deleteGroup };
