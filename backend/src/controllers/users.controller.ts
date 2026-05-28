import { Response } from 'express';
import prisma from '../config/prisma';
import { AuthRequest } from '../middlewares/auth';

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      avatarUrl: true,
      isVerified: true,
      createdAt: true,
      _count: { select: { wishlist: true, ratingsGiven: true } },
    },
  });

  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  const { _count, ...rest } = user;
  res.json({
    ...rest,
    wishlistCount: _count.wishlist,
    ratingsCount: _count.ratingsGiven,
  });
};
