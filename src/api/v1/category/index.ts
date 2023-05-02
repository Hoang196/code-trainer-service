import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateCategoryDto } from './dtos';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getCategories));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateCategoryDto, 'body'),
  asyncRouteHandler(controller.createCategory)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateCategory));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteCategory));

export default router;
