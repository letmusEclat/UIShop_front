export interface Product {
  id: number;
  title: string;
  description: string;
  price: number; // en COP
  imageUrl: string | null;
  tags: string[];
  sellerId: number;
  sellerName?: string;
  studyCenterId?: number | null;
  avgRating?: number;
  isActive: boolean;
}

export interface StudyCenter {
  id: number;
  name: string;
  description: string | null;
  logoUrl: string | null;
  location: string | null;
  amenities?: string[]; // ej: ['wifi', 'ac', 'microwave', 'games']
  schedule?: string; // ej: 'Lun-Vie 8:00 AM - 6:00 PM'
  membershipFree?: boolean;
}

export interface AppEvent {
  id: number;
  title: string;
  studyCenterName: string;
  date: string; // ISO date string
  time?: string;
  category: string;
  actionLabel: 'Ver Detalles' | 'Registrarse';
  imageUrl?: string | null;
}

export interface WishlistItem {
  id: number;
  productId: number;
  product: Product;
  createdAt: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: 'BUYER' | 'SELLER';
  avatarUrl: string | null;
  isVerified: boolean;
}
