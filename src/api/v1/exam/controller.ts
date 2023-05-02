import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getExamsByUserId = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExamsByUserId(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getExam = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExam(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getExams = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExams(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createExam = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createExam(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateExam = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateExam(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteExam = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteExam(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getExamsByUserId, getExam, getExams, createExam, updateExam, deleteExam };
