import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateLanguageDto } from './dtos';

const router = Router();

router.get('/', authMiddleware, asyncRouteHandler(controller.getLanguages));
router.post(
  '/',
  authMiddleware,
  validationMiddleware(CreateLanguageDto, 'body'),
  asyncRouteHandler(controller.createLanguage)
);
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateLanguage));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteLanguage));

export default router;
