import { Router } from 'express';
import actionRouter from './action';
import authRouter from './auth';
import categoryRouter from './category';
import commentRouter from './comment';
import compilerRouter from './compiler';
import examRouter from './exam';
import exerciseRouter from './exercise';
import groupRouter from './group';
import languageRouter from './language';
import postRouter from './post';
import scoreRouter from './score';
import userGroupRouter from './userGroup';
import userRouter from './users';
import statisticRouter from './statistic';
import exerciseExamRouter from './exerciseExam';

const router = Router();

router.use('/action', actionRouter);
router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/comment', commentRouter);
router.use('/compiler', compilerRouter);
router.use('/exam', examRouter);
router.use('/exercise', exerciseRouter);
router.use('/group', groupRouter);
router.use('/language', languageRouter);
router.use('/post', postRouter);
router.use('/score', scoreRouter);
router.use('/user_group', userGroupRouter);
router.use('/users', userRouter);
router.use('/statistic', statisticRouter);
router.use('/exercise_exam', exerciseExamRouter);

export default router;
