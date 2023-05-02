import { Router } from 'express';
import { asyncRouteHandler, validationMiddleware, authMiddleware } from 'middlewares';
import * as controller from './controller';
import { CreateExamDto } from './dtos';

const router = Router();

router.get('/user/:id', authMiddleware, asyncRouteHandler(controller.getExamsByUserId));
router.get('/:id', authMiddleware, asyncRouteHandler(controller.getExam));
router.get('/', authMiddleware, asyncRouteHandler(controller.getExams));
router.post('/', authMiddleware, validationMiddleware(CreateExamDto, 'body'), asyncRouteHandler(controller.createExam));
router.patch('/:id', authMiddleware, asyncRouteHandler(controller.updateExam));
router.delete('/:id', authMiddleware, asyncRouteHandler(controller.deleteExam));

export default router;
