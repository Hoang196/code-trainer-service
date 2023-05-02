import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const checkEmail = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.checkEmail(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const login = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.login(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const refresh = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.refresh(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const changePassword = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.changePassword(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const forgetPassword = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.forgetPassword(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { checkEmail, login, refresh, changePassword, forgetPassword };
