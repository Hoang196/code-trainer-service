import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateExerciseDto } from './dtos';

const router = Router();

router.get('/searchExercise', authMiddleware, asyncRouteHandler(controller.getExercisesSearch));
router.get('/:id', authMiddleware, asyncRouteHandler(controller.getExercise));
router.get('/', authMiddleware, asyncRouteHandler(controller.getExercises));
router.get('/category/:id', authMiddleware, asyncRouteHandler(controller.getExercisesByCategoryId));
router.get('/language/:id', authMiddleware, asyncRouteHandler(controller.getExercisesByLanguageId));
router.get('/solved/:id', authMiddleware, asyncRouteHandler(controller.getExercisesSolved));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateExerciseDto, 'body'),
  asyncRouteHandler(controller.createExercise)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateExercise));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteExercise));

export default router;
