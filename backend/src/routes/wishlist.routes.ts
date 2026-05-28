import { Router } from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlist.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware as any, getWishlist as any);
router.post('/:productId', authMiddleware as any, addToWishlist as any);
router.delete('/:productId', authMiddleware as any, removeFromWishlist as any);

export default router;
