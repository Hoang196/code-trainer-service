import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getUserGroup = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getUserGroup(request.params);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getUserGroups = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getUserGroups(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createUserGroup = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createUserGroup(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateUserGroup = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateUserGroup(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteUserGroup = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteUserGroup(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getUserGroup, getUserGroups, createUserGroup, updateUserGroup, deleteUserGroup };
