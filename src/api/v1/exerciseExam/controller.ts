import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getExerciseExam = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExerciseExam(request.params);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getExerciseExams = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExerciseExams(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createExerciseExam = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createExerciseExam(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateExerciseExam = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateExerciseExam(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteExerciseExam = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteExerciseExam(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getExerciseExam, getExerciseExams, createExerciseExam, updateExerciseExam, deleteExerciseExam };
