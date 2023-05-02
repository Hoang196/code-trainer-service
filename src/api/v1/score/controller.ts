import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getScores = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getScores(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createScore = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createScore(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateScore = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateScore(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteScore = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteScore(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getScores, createScore, updateScore, deleteScore };
