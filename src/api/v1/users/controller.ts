import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getUser(request.params);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getUsers = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getUsers(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createUser(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateUser(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteUser(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getUser, getUsers, createUser, updateUser, deleteUser };
