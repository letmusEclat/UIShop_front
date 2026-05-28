import { Response } from 'express';
import { Prisma } from '../generated/prisma/client';
import prisma from '../config/prisma';
import { AuthRequest } from '../middlewares/auth';

export const getWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const { minPrice, maxPrice, sort, order } = req.query as {
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    order?: string;
  };

  const priceFilter: Prisma.ProductWhereInput = {
    ...(minPrice ? { price: { gte: Number(minPrice) } } : {}),
    ...(maxPrice ? { price: { lte: Number(maxPrice) } } : {}),
  };

  // Ordenamiento: date (por fecha de agregado a wishlist) o price (por precio del producto)
  const sortField = sort === 'price' ? 'price' : 'date';
  const sortOrder = order === 'asc' ? 'asc' : 'desc';

  const orderBy: Prisma.WishlistFindManyArgs['orderBy'] =
    sortField === 'price'
      ? { product: { price: sortOrder } }
      : { createdAt: sortOrder };

  const items = await prisma.wishlist.findMany({
    where: {
      userId,
      product: { isActive: true, ...priceFilter },
    },
    select: {
      id: true,
      createdAt: true,
      product: {
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
      },
    },
    orderBy,
  });

  const result = items.map(({ product: { ratings, _count, seller, ...p }, ...item }) => ({
    ...item,
    productId: p.id,
    productTitle: p.title,
    productPrice: p.price,
    productImageUrl: p.imageUrl,
    productTags: p.tags,
    sellerId: seller.id,
    sellerName: seller.fullName,
    avgRating: ratings.length
      ? Math.round((ratings.reduce((s, r) => s + r.score, 0) / ratings.length) * 10) / 10
      : null,
    wishlistCount: _count.wishlist,
  }));

  res.json(result);
};

export const addToWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const productId = parseInt(req.params['productId'] as string, 10);

  if (isNaN(productId)) {
    res.status(400).json({ error: 'ID de producto inválido' });
    return;
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  const existing = await prisma.wishlist.findUnique({
    where: { userId_productId: { userId, productId } },
  });
  if (existing) {
    res.status(409).json({ error: 'El producto ya está en tu lista de deseos' });
    return;
  }

  await prisma.wishlist.create({ data: { userId, productId } });
  res.status(201).json({ liked: true });
};

export const removeFromWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const productId = parseInt(req.params['productId'] as string, 10);

  if (isNaN(productId)) {
    res.status(400).json({ error: 'ID de producto inválido' });
    return;
  }

  const existing = await prisma.wishlist.findUnique({
    where: { userId_productId: { userId, productId } },
  });
  if (!existing) {
    res.status(404).json({ error: 'El producto no está en tu lista de deseos' });
    return;
  }

  await prisma.wishlist.delete({ where: { id: existing.id } });
  res.json({ liked: false });
};
