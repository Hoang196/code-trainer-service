import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getRanks = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getRanks(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getDash = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getDash(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getHistory = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getHistory(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getHistories = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getHistories(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getDashboard = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getDashboard();
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getRanks, getDash, getHistory, getHistories, getDashboard };
