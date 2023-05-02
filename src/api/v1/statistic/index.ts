import { Router } from 'express';
import { asyncRouteHandler, authMiddleware } from 'middlewares';
import * as controller from './controller';
const router = Router();

router.get('/ranks', authMiddleware, asyncRouteHandler(controller.getRanks));
router.get('/dash/:id', authMiddleware, asyncRouteHandler(controller.getDash));
router.get('/history/:id', authMiddleware, asyncRouteHandler(controller.getHistory));
router.get('/history', authMiddleware, asyncRouteHandler(controller.getHistories));
router.get('/dashboard', asyncRouteHandler(controller.getDashboard));

export default router;
