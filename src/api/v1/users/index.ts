import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateUserDto } from './dtos';

const router = Router();

router.get('/:id', authMiddleware, asyncRouteHandler(controller.getUser));
router.get('/', authMiddleware, asyncRouteHandler(controller.getUsers));
router.post('/', validationMiddleware(CreateUserDto, 'body'), asyncRouteHandler(controller.createUser));
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateUser));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteUser));

export default router;
