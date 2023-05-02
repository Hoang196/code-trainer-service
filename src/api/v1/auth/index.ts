import { Router } from 'express';
import { asyncRouteHandler, authMiddleware, validationMiddleware } from 'middlewares';
import * as controller from './controller';
import { AuthDto, RefreshDto, ChangePasswordDto, ForgetPasswordDto } from './dtos';

const router = Router();

router.post('/check-email', validationMiddleware(AuthDto, 'body'), asyncRouteHandler(controller.checkEmail));
router.post('/login', validationMiddleware(AuthDto, 'body'), asyncRouteHandler(controller.login));
router.post('/refresh', validationMiddleware(RefreshDto, 'body'), asyncRouteHandler(controller.refresh));
router.post(
  '/change-password',
  authMiddleware,
  validationMiddleware(ChangePasswordDto, 'body'),
  asyncRouteHandler(controller.changePassword)
);
router.post(
  '/forget-password',
  validationMiddleware(ForgetPasswordDto, 'body'),
  asyncRouteHandler(controller.forgetPassword)
);

export default router;
