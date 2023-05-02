import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateActionDto } from './dtos';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getActions));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateActionDto, 'body'),
  asyncRouteHandler(controller.createAction)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateAction));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteAction));

export default router;
