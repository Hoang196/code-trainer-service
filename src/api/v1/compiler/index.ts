import { Router } from 'express';
import { asyncRouteHandler, authMiddleware, validationMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateCompilerDto } from './dtos';

const router = Router();
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateCompilerDto, 'body'),
  asyncRouteHandler(controller.compileCode)
);

export default router;
