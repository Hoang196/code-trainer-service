import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getCategories = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getCategories(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createCategory = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createCategory(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateCategory = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateCategory(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteCategory = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteCategory(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getCategories, createCategory, updateCategory, deleteCategory };
