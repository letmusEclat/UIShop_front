import { Router } from 'express';
import { getMe } from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/me', authMiddleware as any, getMe as any);

export default router;
