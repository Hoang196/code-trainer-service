import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateGroupDto } from './dtos';

const router = Router();

router.get('/:id', authMiddleware, asyncRouteHandler(controller.getGroup));
router.get('/user/:id', authMiddleware, asyncRouteHandler(controller.getGroupsByUserId));
router.get('/', authMiddleware, asyncRouteHandler(controller.getGroups));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateGroupDto, 'body'),
  asyncRouteHandler(controller.createGroup)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateGroup));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteGroup));

export default router;
