import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateCommentDto } from './dtos';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getComments));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateCommentDto, 'body'),
  asyncRouteHandler(controller.createComment)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateComment));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteComment));

export default router;
