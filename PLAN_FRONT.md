# UIShop — Plan de Acción: Frontend

> **Proyecto de clase** · UIS · Programación en la Web 2026-I  
> Stack: **React 19 + Vite + TypeScript · Mantine UI · React Router**

---

## Referencia de Mockups (Stitch)

| Pantalla | ID Stitch | Screenshot |
|----------|-----------|------------|
| University Market Homepage | `886a252315f54edb8b2b6c0dbe777346` | ![home](https://lh3.googleusercontent.com/aida/ADBb0uh-OkwSulaaOdWohCjBfpoqeuNo4iglxZl66r9A5GlxaJV632E850kTk-fPtwNZkDAZ6Yr9yK0TPNjyC-isjLVhQaIaMYJizTDf_3SCqpJR1FR7dIzmr36aoZyVC8GM5oAsqV8Hy_IHXF92oCjvy_C11rd8o1lIsUJJUfXP99ifu3JVbb692xMwUPSyF8WH-kNKmpDSv3AKX3PvVP2UfT8L6tCRwsu1MlRuJ8AbZC5EyFJaFhSAm_YloZY) |
| Study Center Details | `54149c4afe7f4d3599e7aa83ee238099` | ![detail](https://lh3.googleusercontent.com/aida/ADBb0uiqY-SvYrdCXsNIUAZgWTqbnbfp6EtZrJCP9amgdABUW6ZWiw-K7bBE8IiC-xzaj2AWs6wbXfSeA4DvsNFujJl_pIIxzjJMsTbczUHl7fvgJWHn5_kXwNDTr680xuQGmXCpaOQ0SODwJKjyCscta4VRDxQdk4WE0hscpvDsPSl2Ko8lJFs5csFT7bXYRB5bB1DAWDD3JwwD0qwOMKDIW5Aezu7czwPk_GxBkjyZH4jPmhUkiuEsQcxwQm0d) |
| Study Centers List + Events | `ae9eee86e1de4e1db78454f5c27f9882` | ![centers](https://lh3.googleusercontent.com/aida/ADBb0ug8NLb2LHIw6GX6u2x-mHuk1Cfiqp65WTLkrAqtbb92VzWkX1td1SczRAGFIVUr9CsdZi1_NQm-p-W4wXzBeGNjg64rrRBiMdg2Pt-j04lJCZRZPSodhmNSe_nhA23ghxMwNIWTPabhuuJGLoS9Z1Rt-3z2L-PYENFfsjRh5jXQJ1AHcrTIQ-3zv4sZo9Ri49Ar5AQeF46VHBDVngprkrbCpe9tVBLfrG5i7ufY-ltZbjlcUxhlABKVYGM) |
| Wishlist | `0e68a29012b042a7bab2117317c7e9c8` | ![wishlist](https://lh3.googleusercontent.com/aida/ADBb0uiLifScogVuVVWiEte3ZnxKp_MNL41hxgKzkTLRVk4H-x0qCbdZM4aSe9hPp0kB1yFjW-Z6iPzVXrOCPe8WBKgVM-8JP23TTDTTyf-cV42e0SP2yP8xmC6y114jZgll5tbt9heSEwpCyAf5swr2UNKy8osHxUkaQLAiF1yq0AZRy7NqPI0jY3mYNqmCAOV1x0OvqDlGDMeQ_vN6Oq-lI67H7kKWGAR07ifczaaZOu2hYRPzRgEnoLWwxbCV) |

---

## Diseño Visual (tokens extraídos de los mockups)

```
Color primario:   #3d8b37   (verde UIS)
Color secundario: #f0f7ee   (verde muy claro, fondos de card)
Fondo:            #ffffff
Texto principal:  #1a1a1a
Texto secundario: #6b7280
Chip activo:      #3d8b37 (fondo) + #ffffff (texto)
Chip inactivo:    #f3f4f6 (fondo) + #374151 (texto)
Badge NUEVO:      #ffffff con texto #1a1a1a, posición overlay
Precio:           #3d8b37 (bold)
Bottom nav activo: #3d8b37 con pill redondeado
```

---

## Estructura de carpetas

```
frontend/src/
├── pages/
│   ├── HomePage.tsx              ← Pantalla principal (mockup 1)
│   ├── StudyCentersPage.tsx      ← Lista de centros + eventos (mockup 3)
│   ├── StudyCenterDetailPage.tsx ← Detalle de un centro (mockup 2)
│   ├── WishlistPage.tsx          ← Lista de deseos (mockup 4)
│   └── ProfilePage.tsx           ← Perfil del usuario
│
├── components/
│   ├── layout/
│   │   └── BottomNav.tsx         ← Barra de navegación inferior (4 tabs)
│   ├── home/
│   │   ├── SearchBar.tsx         ← Input con ícono lupa
│   │   ├── CategoryChips.tsx     ← Tabs horizontales (Comida, Dulce, Sal, Bebidas)
│   │   ├── PromoBanner.tsx       ← Banner hero con badge "NUEVO"
│   │   └── ProductCard.tsx       ← Card con imagen, título, precio, ❤️, add
│   ├── studyCenters/
│   │   ├── StudyCenterCard.tsx   ← Card horizontal con imagen y flecha
│   │   └── EventCard.tsx         ← Card de evento con fecha y categoría
│   └── wishlist/
│       └── WishlistCard.tsx      ← Card de wishlist con toggle favorito
│
├── hooks/
│   ├── useProducts.ts            ← GET /api/products (mock → backend)
│   ├── useStudyCenters.ts        ← GET /api/study-centers (mock → backend)
│   └── useWishlist.ts            ← GET/POST/DELETE /api/wishlist (mock → backend)
│
├── mocks/
│   ├── products.ts               ← Array de productos de prueba
│   ├── studyCenters.ts           ← Array de centros de estudio
│   └── events.ts                 ← Array de eventos próximos
│
├── services/
│   └── api.ts                    ← Fetch wrappers apuntando al backend
│
├── types/
│   └── index.ts                  ← Tipos TS compartidos (Product, StudyCenter, etc.)
│
├── App.tsx                       ← Router principal
└── main.tsx
```

---

## Tipos TypeScript (`types/index.ts`)

```typescript
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;           // en COP
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
  amenities?: string[];    // ej: ['wifi', 'ac', 'microwave']
  schedule?: string;       // ej: 'Lun-Vie 8:00 AM - 6:00 PM'
  membershipFree?: boolean;
}

export interface Event {
  id: number;
  title: string;
  studyCenterName: string;
  date: string;            // ISO date
  time?: string;
  category: string;        // ej: 'Ingeniería Mecánica'
  actionLabel: 'Ver Detalles' | 'Registrarse';
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
```

---

## Mocks

### `mocks/products.ts`

```typescript
import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Sándwich Artesanal',
    description: 'Preparado al instante con pan de masa madre y vegetales frescos.',
    price: 12500,
    imageUrl: 'https://lh3.googleusercontent.com/aida/ADBb0ugVZgx3nQFljGm5PfF-rc9gAi-t4cKW4ddKcUBV6nvtRVeqSgnpWYG7CUTWjpzdf3hG-Qvp4qPrwEbQVrXKekpfRTHiFe9xJEce5mdLB0cCHqTvCbkUeEtq2um1ZDs_aNTlrqIQX-NUTJKk75qkYBBIev3qlSWeSXRedTBFbu656QHl1SS7G9bcVJjvTk5EGXbUHZ_lRCEYw3vEkxQXh6_HAzHL0I9BhqlNi0GpTCeR31u_3PiJYavw2MrD1QpPMnVWOMzAljD0NQ',
    tags: ['Comida'],
    sellerId: 1,
    sellerName: 'Tienda Sistemas',
    studyCenterId: 1,
    isActive: true,
  },
  {
    id: 2,
    title: 'Café Helado',
    description: 'Perfecto para las tardes largas de estudio en biblioteca.',
    price: 8000,
    imageUrl: null,
    tags: ['Bebidas'],
    sellerId: 1,
    sellerName: 'Tienda Sistemas',
    studyCenterId: 1,
    isActive: true,
  },
  {
    id: 3,
    title: 'Galletas de Avena',
    description: 'Paquete de 3 galletas caseras, ideales para compartir.',
    price: 6000,
    imageUrl: null,
    tags: ['Dulce'],
    sellerId: 2,
    sellerName: 'Cafetería Central',
    studyCenterId: null,
    isActive: true,
  },
  {
    id: 4,
    title: 'Empanadas',
    description: 'Empanadas de carne, recién hechas. Últimas unidades.',
    price: 2500,
    imageUrl: null,
    tags: ['Comida', 'Sal'],
    sellerId: 2,
    sellerName: 'Cafetería Central',
    studyCenterId: null,
    isActive: true,
  },
];

export const MOCK_WISHLIST_PRODUCTS: Product[] = [
  {
    id: 10,
    title: 'Artisanal Sandwich',
    description: 'Freshly made artisan sandwich.',
    price: 8500,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3MlQ3hbpUBY9WGfQk4qIpBccHQ_taGvao4de44CHrKovl_zBOSLXlnZaGy380eerzl7W2KvaLDBcZ3b1jhgAC-XXXfKu8yqmkvk6g-yHKA1HTSW5lbio18EWuqnq5jnwxaLt9aPoUVElRUewP95hEhx4awOphe-DoGUa93zYvx78z5pKijJOyAhNJPRG5efJ5xrrJc6hPRtDOMSlVewa0cV2WELFJiTNjTyb6FiTV3CDXeAj7H3Tw999uBAnDOvEbwjjXzcvODFrN',
    tags: ['Comida'],
    sellerId: 1,
    isActive: true,
  },
  {
    id: 11,
    title: 'Essential Hoodie',
    description: 'Comfortable everyday hoodie.',
    price: 45000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYutxE9WUK_yYjwGrpOtkoqQ6XCeVumMUFSWxjJf70MKI8816W-z8ca-AXvNh1njws2EZc1yLudF5VXsq-yHFjJCIhDxJkYzaLiw-B4Kg8Y0R1CdLvIr0bzw4diPt6o_50P4D4BGnoqIAxRLasRfZqs-VXx5qus36XFgRnUwIhde6S-8f0xd6U-kuoWDcynF6emF464UTDe0tUlsnedb2CGGlsm5kX5Vea8VC_jlM4tqiLMPPGOzFcAuC3iTP0WsI3xG-RdErIhnJv',
    tags: ['Ropa'],
    sellerId: 2,
    isActive: true,
  },
  {
    id: 12,
    title: 'Artisan Mug',
    description: 'Handcrafted ceramic mug.',
    price: 18000,
    imageUrl: null,
    tags: ['Útiles'],
    sellerId: 3,
    isActive: true,
  },
  {
    id: 13,
    title: 'Canvas Tote Bag',
    description: 'Durable canvas tote for campus use.',
    price: 22000,
    imageUrl: null,
    tags: ['Accesorios'],
    sellerId: 3,
    isActive: true,
  },
];
```

### `mocks/studyCenters.ts`

```typescript
import { StudyCenter } from '../types';

export const MOCK_STUDY_CENTERS: StudyCenter[] = [
  {
    id: 1,
    name: 'Ingeniería de Sistemas',
    description: 'Acá podrás encontrar bebidas, empanadas, chocolate caliente, postres, servicio de videojuegos, y un excelente ambiente para estudiar.',
    logoUrl: 'https://lh3.googleusercontent.com/aida/ADBb0uh7dW3lYfY5pkI6F-3wPbI49RlCXO7r_pb70iKfd-P8GV-mqxPCgqz9y4nHMOilh2g3aEwWfGzHpPUf7T7cmWeTi3ymPjX_H8uN3I79V_qPOU9Bgddorm3SLvAqqXeIV6sXgt3wKotVvLrYg0frXMU0psn_o0fJZH8nVwQaIO1rCD_gct8uixkveKSid2q6RLGgzOSHzc9ZM6-Ory143ibQYBFaLcuw3kqciAonW0PyCs7Rn9-FBbGkbKY3DdQNSEwF7GPoEFUzfzo',
    location: 'Edificio de Ingenierías, Piso 3',
    amenities: ['wifi', 'ac', 'microwave', 'games'],
    schedule: 'Lun - Vie  8:00 AM - 6:00 PM',
    membershipFree: true,
  },
  {
    id: 2,
    name: 'Ingeniería Civil',
    description: 'Espacio de estudio con recursos especializados en construcción e infraestructura.',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP69IUfaOqvhkO8RV-4-Sibzd7bHFEs30ZPHTwXjx8FYxWY0ojAA2_P4UPnQr4PDrnLuUuAQ-jJCw9CN0y3JwsTB9Lo4itU-pkZwvR07E5G5VOzO_Yl0nOLlMNf-AAn7R6bnsOhnkCsAwUvTc1fCYV1a4CyQ--Uovh42vdyOqgaEjh1it64pppW620RHKvCUFUKzU47nj-cUJxjbMbLt5lTNsp6hKLFmy90AJHsWfc0aXKswKVHMrex8v3gSUkUjE1CVglCVHiFim3',
    location: 'Edificio A, Piso 1',
    amenities: ['wifi'],
    schedule: 'Lun - Vie  7:00 AM - 5:00 PM',
    membershipFree: true,
  },
  {
    id: 3,
    name: 'Ingeniería Mecánica',
    description: 'Laboratorios de robótica avanzada y sistemas automatizados.',
    logoUrl: null,
    location: 'Edificio de Talleres',
    amenities: ['wifi', 'ac'],
    schedule: 'Lun - Vie  8:00 AM - 5:00 PM',
    membershipFree: false,
  },
  {
    id: 4,
    name: 'Química',
    description: 'Laboratorios de ingeniería química y biología molecular.',
    logoUrl: null,
    location: 'Edificio B, Piso 2',
    amenities: ['ac'],
    schedule: 'Lun - Vie  8:00 AM - 5:00 PM',
    membershipFree: false,
  },
];
```

### `mocks/events.ts`

```typescript
import { Event } from '../types';

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Feria de Innovación',
    studyCenterName: 'Ingeniería Mecánica',
    date: '2026-10-15',
    category: 'Ingeniería Mecánica',
    actionLabel: 'Ver Detalles',
  },
  {
    id: 2,
    title: 'Seminario de Termodinámica',
    studyCenterName: 'Química',
    date: '2026-11-22',
    time: '14:00 - 17:00',
    category: 'Química',
    actionLabel: 'Registrarse',
  },
];
```

---

## Capa de Servicios (`services/api.ts`)

> **Estrategia:** `USE_MOCK = true` mientras no hay backend. Cambiar a `false` cuando el backend esté listo.

```typescript
// src/services/api.ts

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
const USE_MOCK = true; // ← cambiar a false cuando el backend esté listo

import { MOCK_PRODUCTS } from '../mocks/products';
import { MOCK_STUDY_CENTERS } from '../mocks/studyCenters';
import { MOCK_EVENTS } from '../mocks/events';
import type { Product, StudyCenter, Event, WishlistItem } from '../types';

function authHeader(): HeadersInit {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ── Productos ──────────────────────────────────────────────
export async function fetchProducts(params?: { tag?: string; search?: string }): Promise<Product[]> {
  if (USE_MOCK) {
    let results = [...MOCK_PRODUCTS];
    if (params?.tag) results = results.filter(p => p.tags.includes(params.tag!));
    if (params?.search) results = results.filter(p => p.title.toLowerCase().includes(params.search!.toLowerCase()));
    return results;
  }
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${BASE_URL}/products${qs ? `?${qs}` : ''}`);
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  if (USE_MOCK) return MOCK_PRODUCTS.find(p => p.id === id)!;
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}

// ── Centros de estudio ─────────────────────────────────────
export async function fetchStudyCenters(): Promise<StudyCenter[]> {
  if (USE_MOCK) return MOCK_STUDY_CENTERS;
  const res = await fetch(`${BASE_URL}/study-centers`);
  return res.json();
}

export async function fetchStudyCenterById(id: number): Promise<StudyCenter> {
  if (USE_MOCK) return MOCK_STUDY_CENTERS.find(c => c.id === id)!;
  const res = await fetch(`${BASE_URL}/study-centers/${id}`);
  return res.json();
}

export async function fetchStudyCenterProducts(id: number): Promise<Product[]> {
  if (USE_MOCK) return MOCK_PRODUCTS.filter(p => p.studyCenterId === id);
  const res = await fetch(`${BASE_URL}/study-centers/${id}/products`);
  return res.json();
}

export async function fetchEvents(): Promise<Event[]> {
  if (USE_MOCK) return MOCK_EVENTS;
  // cuando haya endpoint:
  // const res = await fetch(`${BASE_URL}/events`);
  // return res.json();
  return MOCK_EVENTS;
}

// ── Wishlist ───────────────────────────────────────────────
let _mockWishlist: number[] = [10, 11, 12, 13]; // IDs en wishlist

export async function fetchWishlist(): Promise<WishlistItem[]> {
  if (USE_MOCK) {
    const { MOCK_WISHLIST_PRODUCTS } = await import('../mocks/products');
    return _mockWishlist.map((id, i) => ({
      id: i + 1,
      productId: id,
      product: MOCK_WISHLIST_PRODUCTS.find(p => p.id === id)!,
      createdAt: new Date().toISOString(),
    }));
  }
  const res = await fetch(`${BASE_URL}/wishlist`, { headers: authHeader() });
  return res.json();
}

export async function toggleWishlist(productId: number): Promise<{ liked: boolean }> {
  if (USE_MOCK) {
    const idx = _mockWishlist.indexOf(productId);
    if (idx >= 0) {
      _mockWishlist.splice(idx, 1);
      return { liked: false };
    } else {
      _mockWishlist.push(productId);
      return { liked: true };
    }
  }
  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: 'POST',
    headers: authHeader(),
  });
  return res.json();
}

export async function removeFromWishlist(productId: number): Promise<void> {
  if (USE_MOCK) {
    _mockWishlist = _mockWishlist.filter(id => id !== productId);
    return;
  }
  await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: 'DELETE',
    headers: authHeader(),
  });
}
```

---

## Hooks

### `hooks/useProducts.ts`

```typescript
import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import type { Product } from '../types';

export function useProducts(filters?: { tag?: string; search?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts(filters)
      .then(setProducts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [filters?.tag, filters?.search]);

  return { products, loading, error };
}
```

### `hooks/useStudyCenters.ts`

```typescript
import { useState, useEffect } from 'react';
import { fetchStudyCenters } from '../services/api';
import type { StudyCenter } from '../types';

export function useStudyCenters() {
  const [centers, setCenters] = useState<StudyCenter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudyCenters().then(setCenters).finally(() => setLoading(false));
  }, []);

  return { centers, loading };
}
```

### `hooks/useWishlist.ts`

```typescript
import { useState, useEffect, useCallback } from 'react';
import { fetchWishlist, toggleWishlist, removeFromWishlist } from '../services/api';
import type { WishlistItem } from '../types';

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetchWishlist().then(setItems).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = async (productId: number) => {
    await toggleWishlist(productId);
    load();
  };

  const remove = async (productId: number) => {
    await removeFromWishlist(productId);
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  return { items, loading, toggle, remove };
}
```

---

## Componentes clave

### `BottomNav.tsx`
- 4 tabs: Home (`🏠`), Study Centers (`🎓`), Wishlist (`❤️`), Profile (`👤`)
- Tab activo: fondo verde `#3d8b37`, pill redondeado, texto blanco
- Tab inactivo: texto gris
- Usa `useNavigate` / `NavLink` de React Router
- Posición `fixed bottom-0`, `z-index: 100`, fondo blanco, sombra superior

### `ProductCard.tsx`
- Props: `product: Product`, `onToggleWishlist: (id: number) => void`, `isWishlisted: boolean`
- Muestra: imagen (fallback placeholder), título truncado, precio en COP formateado, botón ❤️ (toggle), botón "Add" con ícono carrito
- Precio: `new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price)`

### `SearchBar.tsx`
- Props: `value: string`, `onChange: (v: string) => void`, `placeholder?: string`
- Input con ícono lupa a la izquierda, bordes redondeados, fondo gris claro

### `CategoryChips.tsx`
- Props: `categories: string[]`, `active: string`, `onChange: (c: string) => void`
- Scroll horizontal, sin wrapping
- Categorías por defecto: `['Comida', 'Dulce', 'Sal', 'Bebidas']`

### `PromoBanner.tsx`
- Props: `imageUrl: string`, `badge: string`, `title: string`, `subtitle: string`
- Badge absoluto top-left (texto blanco, fondo semi-transparente)
- Texto sobre imagen con gradiente oscuro abajo

### `StudyCenterCard.tsx`
- Props: `center: StudyCenter`, `onClick: () => void`
- Layout horizontal: imagen circular/cuadrada a la izquierda, nombre + descripción corta, flecha `›` a la derecha

### `EventCard.tsx`
- Props: `event: Event`
- Muestra: categoría (con ícono), título, fecha (`calendar_month`), hora (opcional), botón de acción

---

## Páginas

### `HomePage.tsx`

```
Layout:
  <Header>  logo UIS + "UiShop" + ícono búsqueda
  <SearchBar>
  <CategoryChips>  (Comida · Dulce · Sal · Bebidas)
  <PromoBanner>  "¡Oferta de último momento!" imagen + badge NUEVO
  <Section "Destacados">
    "Ver todos" link →
    <HorizontalScroll>
      <ProductCard /> × N
    </HorizontalScroll>
  <BottomNav>

Estado local:
  - activeCategory: string
  - searchQuery: string
Hook: useProducts({ tag: activeCategory, search: searchQuery })
```

### `StudyCentersPage.tsx`

```
Layout:
  <Header>  logo + "UiShop"
  <PageTitle> "Centros de Estudio"
  <Subtitle>  "Explora los centros de estudio..."
  <Section "Próximos Eventos">
    <EventCard /> × events  (carrusel horizontal)
  <Section "Centros de estudio">
    <StudyCenterCard /> × centers  (lista vertical)
  <BottomNav>

Hook: useStudyCenters()
     + fetchEvents() en useEffect
```

### `StudyCenterDetailPage.tsx`

```
Layout:
  <BackButton>  ← + "UiShop"
  <HeroImage>  imagen del centro
  <Badge>  "Study Center"
  <Title>  nombre del centro
  <Location>  📍 + location
  <Quote>  descripción larga
  <InfoRow>  🕐 Horario + 💳 Membresía
  <Section "Comodidades">
    chips de amenidades (wifi, ac, microwave, games)
  <Section "Populares aquí">
    "Ver todo →"
    <HorizontalScroll>
      <ProductCard /> × productos del centro
    </HorizontalScroll>
  <BottomNav>

Params: id de la URL (react-router :id)
Hooks: fetchStudyCenterById(id) + fetchStudyCenterProducts(id)
```

### `WishlistPage.tsx`

```
Layout:
  <Header>  logo + "UiShop" + ícono ❤️
  <PageHeader>
    ícono corazón (rosa, fondo redondeado)
    "My Wishlist"
    "Your favorite study snacks and essentials."
  <SearchBar>  "Search your wishlist..."
  <SortBar>  "Sort by:" + chips Price / Date
  <Grid 2 columnas>
    <WishlistCard /> × items
  <BottomNav>

Estado local:
  - search: string
  - sortBy: 'price' | 'date'
Hook: useWishlist()
Items filtrados y ordenados localmente

⚠️  Requiere auth: todos los endpoints de wishlist exigen Bearer token.
     Flujo: si no hay token → redirigir a /login.
     Backend devuelve shape plana → normalizeWishlistItem() en api.ts reconstruye
     el objeto WishlistItem anidado que usan los componentes.
     toggle = POST /wishlist/:id (agregar) o DELETE /wishlist/:id (eliminar),
     la decisión se toma en useWishlist.toggle() según estado local.
```

### `ProfilePage.tsx`

```
Layout:
  <Header>  logo + "UiShop"
  <ProfileCard>
    avatar (iniciales o avatarUrl del usuario logueado)
    nombre + email
    badges dinámicos según role
  <MenuCard>
    → Mis Pedidos  "Track your recent purchases"
    → Configuración  "Account, privacy, notifications"
    → Ayuda  "FAQs, support, contact us"
  <LogOutButton>  rojo/outline → llama logout() de auth.ts + redirect /login
  <BottomNav>

Estado: getStoredUser() de services/auth.ts (post-auth)
Si no hay usuario: redirect a /login
```

---

## Configuración del Router (`App.tsx`)

React Router v7 usa el API de objeto (`createBrowserRouter`) en lugar de JSX:

```tsx
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudyCentersPage from './pages/StudyCentersPage';
import StudyCenterDetailPage from './pages/StudyCenterDetailPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  { path: '/', loader: () => redirect('/home') },
  { path: '/home', element: <HomePage /> },
  { path: '/study-centers', element: <StudyCentersPage /> },
  { path: '/study-centers/:id', element: <StudyCenterDetailPage /> },
  { path: '/wishlist', element: <WishlistPage /> },
  { path: '/profile', element: <ProfilePage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## Dependencias a instalar

```bash
cd frontend
npm install react-router-dom   # v7 — ya incluye createBrowserRouter
```

> **Ya instalados:** React 19, Mantine UI, react-icons, TypeScript, Vite.  
> No se necesita Redux ni Zustand — el estado se maneja con `useState` y hooks propios.

---

## Variable de entorno

```env
# frontend/.env
VITE_API_URL=http://localhost:3000/api
```

> Mientras `USE_MOCK = true` en `api.ts`, esta variable no tiene efecto.

---

## Orden de Implementación

```
Paso 1  → Instalar react-router-dom + configurar App.tsx con rutas          ✅ listo
Paso 2  → Crear types/index.ts                                               ✅ listo
Paso 3  → Crear mocks/ (products, studyCenters, events)                      ✅ listo
Paso 4  → Crear services/api.ts (con USE_MOCK = true)                        ✅ listo
Paso 5  → Crear hooks/ (useProducts, useStudyCenters, useWishlist)           ✅ listo
Paso 6  → Crear BottomNav (layout compartido)                                ✅ listo
Paso 7  → Implementar HomePage (SearchBar + CategoryChips + PromoBanner + ProductCard)  ✅ listo
Paso 8  → Implementar StudyCentersPage (EventCard + StudyCenterCard)         ✅ listo
Paso 9  → Implementar StudyCenterDetailPage (detalle + productos)            ✅ listo
Paso 10 → Implementar WishlistPage (grid + sort + toggle)                   ✅ listo
Paso 11 → Implementar ProfilePage (datos mockeados)                          ✅ listo

── Conexión al Backend ────────────────────────────────────────────────────────
Paso 12 → Conectar productos al backend                                      ✅ listo
           normalizeProduct(), .env.local, fetchProducts/fetchProductById
Paso 13 → Conectar centros de estudio al backend                             ✅ listo
           fetchStudyCenters, fetchStudyCenterById, fetchStudyCenterProducts
           (extracción de products embebidos en GET /study-centers/:id)
Paso 14 → Capa de Auth (services/auth.ts + LoginPage)                        🚧 pendiente UI
           - services/auth.ts: login(), logout(), getToken(), getStoredUser()  ✅ listo
           - LoginPage.tsx: formulario email + password                        🚧 pendiente diseño
           - Ruta /login en App.tsx + redirect guard                           🚧 pendiente
Paso 15 → Conectar Wishlist al backend (tras Paso 14)                        🚧 pendiente
           - normalizeWishlistItem() en api.ts                                 ✅ listo
           - addToWishlist() POST + removeFromWishlist() DELETE                ✅ listo
           - useWishlist.toggle() inteligente (add vs remove según estado)    ✅ listo
           - Flipear USE_MOCK = false para wishlist                            🚧 espera login
Paso 16 → Conectar ProfilePage a usuario real (getStoredUser())              🚧 pendiente
```

---

## Colores y tokens CSS (para `index.css` o variables Mantine)

```css
:root {
  --color-primary:      #3d8b37;
  --color-primary-light:#f0f7ee;
  --color-bg:           #ffffff;
  --color-text:         #1a1a1a;
  --color-text-muted:   #6b7280;
  --color-border:       #e5e7eb;
  --color-chip-bg:      #f3f4f6;
  --radius-card:        12px;
  --radius-chip:        999px;
  --bottom-nav-height:  64px;
}
```

---

## Notas de implementación

- **Mobile-first:** El diseño es para móvil (`max-width: 430px`). En escritorio se centra el contenido.
- **Padding inferior:** Todas las páginas necesitan `padding-bottom: var(--bottom-nav-height)` para que el contenido no quede debajo del BottomNav fijo.
- **Formato COP:** Usar `Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })`.
- **Imágenes sin URL:** Mostrar un placeholder verde con la inicial del nombre del producto.
- **Conexión backend:** Solo cambiar `USE_MOCK = false` en `services/api.ts` y asegurarse que `VITE_API_URL` apunte al servidor.
