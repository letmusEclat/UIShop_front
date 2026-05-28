import { Router } from 'express';
import { getStudyCenters, getStudyCenterById } from '../controllers/studyCenters.controller';

const router = Router();

router.get('/', getStudyCenters);
router.get('/:id', getStudyCenterById);

export default router;
