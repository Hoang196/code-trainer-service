import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getExercise = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExercise(request.params);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getExercises = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExercises(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getExercisesByCategoryId = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExercisesByCategoryId(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getExercisesByLanguageId = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExercisesByLanguageId(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getExercisesSolved = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExercisesSolved(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getExercisesSearch = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getExercisesSearch(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createExercise = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createExercise(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateExercise = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateExercise(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteExercise = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteExercise(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export {
  getExercise,
  getExercises,
  getExercisesByCategoryId,
  getExercisesByLanguageId,
  getExercisesSolved,
  getExercisesSearch,
  createExercise,
  updateExercise,
  deleteExercise,
};
