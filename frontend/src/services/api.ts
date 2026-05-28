import { MOCK_WISHLIST_PRODUCTS } from '../mocks/products';
import { MOCK_EVENTS } from '../mocks/events';
import type { Product, StudyCenter, AppEvent, WishlistItem } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
const SERVER_URL = BASE_URL.replace(/\/api$/, ''); // http://localhost:3000
const USE_MOCK = false; // wishlist conectada al backend real; events aún en mock (sin endpoint)

function authHeader(): HeadersInit {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ── Normalizer ────────────────────────────────────────────
// El backend serializa Decimal de Prisma como string → convertimos a number
// description puede faltar en productos embebidos dentro de study-centers/:id

// Las imágenes llegan como rutas relativas (/uploads/...) → prefijamos el servidor
function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${SERVER_URL}${url}`;
}
type RawProduct = Omit<Product, 'price' | 'isActive' | 'description'> & {
  price: string | number;
  isActive?: boolean;
  description?: string;
  sellerAvatarUrl?: string | null;
  studyCenterName?: string | null;
  wishlistCount?: number;
  ratingCount?: number;
  createdAt?: string;
};

function normalizeProduct({ price, isActive, description, sellerAvatarUrl, studyCenterName, wishlistCount, ratingCount, createdAt, ...rest }: RawProduct): Product {
  return { ...rest, imageUrl: resolveImageUrl(rest.imageUrl), description: description ?? '', price: Number(price), isActive: isActive ?? true };
}

// ── Productos ──────────────────────────────────────────────

export async function fetchProducts(params?: {
  tag?: string;
  search?: string;
}): Promise<Product[]> {
  const qs = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params ?? {}).filter(([, v]) => v !== undefined),
    ) as Record<string, string>,
  ).toString();
  const res = await fetch(`${BASE_URL}/products${qs ? `?${qs}` : ''}`);
  if (!res.ok) throw new Error('Error al obtener productos');
  const data: RawProduct[] = await res.json();
  return data.map(normalizeProduct);
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    if (res.status === 404) return undefined;
    throw new Error('Producto no encontrado');
  }
  const data: RawProduct = await res.json();
  return normalizeProduct(data);
}

// ── Centros de estudio ─────────────────────────────────────

export async function fetchStudyCenters(): Promise<StudyCenter[]> {
  const res = await fetch(`${BASE_URL}/study-centers`);
  if (!res.ok) throw new Error('Error al obtener centros');
  const data: StudyCenter[] = await res.json();
  return data.map(c => ({ ...c, logoUrl: resolveImageUrl(c.logoUrl) }));
}

// El backend embebe los productos dentro del detalle del centro.
// Ambas funciones llaman al mismo endpoint y extraen lo que necesitan.
async function _fetchStudyCenterDetail(id: number): Promise<{ products: RawProduct[] } & StudyCenter | undefined> {
  const res = await fetch(`${BASE_URL}/study-centers/${id}`);
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error('Centro no encontrado');
  return res.json();
}

export async function fetchStudyCenterById(id: number): Promise<StudyCenter | undefined> {
  const data = await _fetchStudyCenterDetail(id);
  if (!data) return undefined;
  const { products: _, ...center } = data;
  return { ...center, logoUrl: resolveImageUrl(center.logoUrl) };
}

export async function fetchStudyCenterProducts(id: number): Promise<Product[]> {
  const data = await _fetchStudyCenterDetail(id);
  if (!data) return [];
  return data.products.map(normalizeProduct);
}

export async function fetchEvents(): Promise<AppEvent[]> {
  if (USE_MOCK) return MOCK_EVENTS;
  // const res = await fetch(`${BASE_URL}/events`);
  // return res.json();
  return MOCK_EVENTS;
}

// ── Wishlist ───────────────────────────────────────────────

// Shape plana que devuelve el backend (distinta al tipo WishlistItem anidado)
interface RawWishlistItem {
  id: number;
  createdAt: string;
  productId: number;
  productTitle: string;
  productPrice: string | number;
  productImageUrl: string | null;
  productTags: string[];
  sellerId: number;
  sellerName: string;
  avgRating: number | null;
  wishlistCount: number;
}

function normalizeWishlistItem(raw: RawWishlistItem): WishlistItem {
  return {
    id: raw.id,
    createdAt: raw.createdAt,
    productId: raw.productId,
    product: {
      id: raw.productId,
      title: raw.productTitle,
      price: Number(raw.productPrice),
      imageUrl: resolveImageUrl(raw.productImageUrl),
      tags: raw.productTags,
      sellerId: raw.sellerId,
      sellerName: raw.sellerName,
      avgRating: raw.avgRating ?? undefined,
      description: '',
      isActive: true,
    },
  };
}

let _mockWishlistIds: number[] = [10, 11, 12, 13];

export async function fetchWishlist(): Promise<WishlistItem[]> {
  if (USE_MOCK) {
    return _mockWishlistIds
      .map((id, i) => {
        const product = MOCK_WISHLIST_PRODUCTS.find((p) => p.id === id);
        if (!product) return null;
        return {
          id: i + 1,
          productId: id,
          product,
          createdAt: new Date().toISOString(),
        };
      })
      .filter(Boolean) as WishlistItem[];
  }
  const res = await fetch(`${BASE_URL}/wishlist`, { headers: authHeader() });
  if (!res.ok) throw new Error('Error al obtener wishlist');
  const data: RawWishlistItem[] = await res.json();
  return data.map(normalizeWishlistItem);
}

// Agrega un producto a la wishlist (POST). Requiere auth.
export async function addToWishlist(productId: number): Promise<{ liked: boolean }> {
  if (USE_MOCK) {
    if (!_mockWishlistIds.includes(productId)) _mockWishlistIds.push(productId);
    return { liked: true };
  }
  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: 'POST',
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Error al agregar a wishlist');
  return res.json();
}

// Compatibilidad con mock: decide add/remove en un solo toggle
export async function toggleWishlist(productId: number): Promise<{ liked: boolean }> {
  if (USE_MOCK) {
    const idx = _mockWishlistIds.indexOf(productId);
    if (idx >= 0) {
      _mockWishlistIds.splice(idx, 1);
      return { liked: false };
    } else {
      _mockWishlistIds.push(productId);
      return { liked: true };
    }
  }
  return addToWishlist(productId);
}

export async function removeFromWishlist(productId: number): Promise<void> {
  if (USE_MOCK) {
    _mockWishlistIds = _mockWishlistIds.filter((id) => id !== productId);
    return;
  }
  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Error al eliminar de wishlist');
}
