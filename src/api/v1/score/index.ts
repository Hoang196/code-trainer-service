import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateScoreDto } from './dtos';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getScores));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateScoreDto, 'body'),
  asyncRouteHandler(controller.createScore)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateScore));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteScore));

export default router;
