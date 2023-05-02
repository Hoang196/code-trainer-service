import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateUserGroupDto } from './dtos';

const router = Router();

router.get('/:id', authMiddleware, asyncRouteHandler(controller.getUserGroup));
router.get('/', authMiddleware, asyncRouteHandler(controller.getUserGroups));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateUserGroupDto, 'body'),
  asyncRouteHandler(controller.createUserGroup)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateUserGroup));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteUserGroup));

export default router;
