import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { Prisma } from '../generated/prisma/client';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  const { tag, search } = req.query as { tag?: string; search?: string };

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(tag ? { tags: { has: tag } } : {}),
    ...(search ? { title: { contains: search, mode: 'insensitive' as const } } : {}),
  };

  const products = await prisma.product.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      imageUrl: true,
      tags: true,
      createdAt: true,
      seller: { select: { id: true, fullName: true, avatarUrl: true } },
      studyCenter: { select: { id: true, name: true } },
      _count: { select: { wishlist: true } },
      ratings: { select: { score: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const result = products.map(({ ratings, _count, seller, studyCenter, ...p }) => ({
    ...p,
    sellerId: seller.id,
    sellerName: seller.fullName,
    sellerAvatarUrl: seller.avatarUrl,
    studyCenterId: studyCenter?.id ?? null,
    studyCenterName: studyCenter?.name ?? null,
    avgRating: ratings.length
      ? Math.round((ratings.reduce((s, r) => s + r.score, 0) / ratings.length) * 10) / 10
      : null,
    wishlistCount: _count.wishlist,
    ratingCount: ratings.length,
  }));

  res.json(result);
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params['id'] as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      seller: { select: { id: true, fullName: true, avatarUrl: true } },
      studyCenter: true,
      _count: { select: { wishlist: true } },
      ratings: {
        select: {
          id: true,
          score: true,
          comment: true,
          createdAt: true,
          user: { select: { id: true, fullName: true, avatarUrl: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  const { ratings, _count, ...rest } = product;
  res.json({
    ...rest,
    avgRating: ratings.length
      ? Math.round((ratings.reduce((s, r) => s + r.score, 0) / ratings.length) * 10) / 10
      : null,
    wishlistCount: _count.wishlist,
    ratings,
  });
};
