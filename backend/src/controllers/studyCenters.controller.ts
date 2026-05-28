import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getStudyCenters = async (_req: Request, res: Response): Promise<void> => {
  const centers = await prisma.studyCenter.findMany({
    include: {
      _count: { select: { products: { where: { isActive: true } } } },
    },
    orderBy: { name: 'asc' },
  });

  const result = centers.map(({ _count, ...c }) => ({
    ...c,
    productCount: _count.products,
  }));

  res.json(result);
};

export const getStudyCenterById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params['id'] as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  const center = await prisma.studyCenter.findUnique({
    where: { id },
    include: {
      products: {
        where: { isActive: true },
        select: {
          id: true,
          title: true,
          price: true,
          imageUrl: true,
          tags: true,
          seller: { select: { id: true, fullName: true } },
          _count: { select: { wishlist: true } },
          ratings: { select: { score: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!center) {
    res.status(404).json({ error: 'Centro de estudio no encontrado' });
    return;
  }

  const { products, ...centerData } = center;
  const productsFormatted = products.map(({ ratings, _count, seller, ...p }) => ({
    ...p,
    sellerId: seller.id,
    sellerName: seller.fullName,
    avgRating: ratings.length
      ? Math.round((ratings.reduce((s, r) => s + r.score, 0) / ratings.length) * 10) / 10
      : null,
    wishlistCount: _count.wishlist,
  }));

  res.json({ ...centerData, products: productsFormatted });
};
