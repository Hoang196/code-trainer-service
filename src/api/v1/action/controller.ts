import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getActions = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getActions(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createAction = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createAction(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateAction = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateAction(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteAction = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteAction(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getActions, createAction, updateAction, deleteAction };
