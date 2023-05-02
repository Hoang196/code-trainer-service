import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getLanguages = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getLanguages(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createLanguage = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createLanguage(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateLanguage = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateLanguage(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteLanguage = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteLanguage(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getLanguages, createLanguage, updateLanguage, deleteLanguage };
