import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateExerciseExamDto } from './dtos';

const router = Router();

router.get('/:id', authMiddleware, asyncRouteHandler(controller.getExerciseExam));
router.get('/', authMiddleware, asyncRouteHandler(controller.getExerciseExams));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateExerciseExamDto, 'body'),
  asyncRouteHandler(controller.createExerciseExam)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateExerciseExam));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteExerciseExam));

export default router;
