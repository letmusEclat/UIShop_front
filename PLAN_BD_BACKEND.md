# UIShop — Plan de Acción: Base de Datos & Backend

> **Proyecto de clase** · UIS · Programación en la Web 2026-I  
> Stack: **Express + TypeScript · PostgreSQL · React + Vite**

---

## Resumen del Proyecto

UIShop es un marketplace universitario. El sistema se divide en dos responsabilidades claras:

| Responsabilidad | ¿Quién lo hace? | Cómo |
|----------------|----------------|------|
| Ingresar datos (productos, centros, vendedores) | Administrador | Scripts SQL / seed directo a la BD |
| Consultar y navegar datos | Usuario comprador | API REST → Frontend |

> **Alcance de esta fase:** solo el lado del comprador (lectura + wishlist). La gestión de vendedores y centros de estudio queda fuera.

### Secciones del Frontend a conectar
| # | Sección | Qué necesita del backend |
|---|---------|-------------------------|
| 1 | **Home** | Listado de productos/vendedores con filtros |
| 2 | **Centros de estudio** | Listado de centros (solo lectura) |
| 3 | **Wishlist** | Leer favoritos + toggle ❤️ |
| 4 | **Perfil** | Datos del usuario autenticado |
| 5 | **Detalle** | Un producto en específico |

---

## Fase 1 — Diseño de Base de Datos

### 1.1 Herramientas recomendadas

| Herramienta | Propósito |
|-------------|-----------|
| **PostgreSQL 16** | Motor de base de datos |
| **Prisma ORM** | Mapeo de tablas ↔ TypeScript, migraciones automáticas |
| **DBeaver / pgAdmin** | Cliente visual para revisar la BD |

> ¿Por qué Prisma? Genera los tipos TypeScript automáticamente, las migraciones son un solo comando y reduce el SQL manual a cero.

---

### 1.2 Diagrama Entidad–Relación

```
users ──────────< products
  │                  │
  │                  │
  ├──< wishlist >────┘
  │
  ├──< ratings >──── products
  │
  └── study_centers (referencia de matrícula)
```

---

### 1.3 Esquema Prisma (archivo `schema.prisma`)

```prisma
// backend/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────────
// USUARIOS (compradores y vendedores)
// ─────────────────────────────────────────────
model User {
  id            Int       @id @default(autoincrement())
  email         String    @unique
  passwordHash  String
  fullName      String
  role          Role      @default(BUYER)
  avatarUrl     String?
  studentCardUrl String?  // para verificación de carnet
  isVerified    Boolean   @default(false)
  createdAt     DateTime  @default(now())

  products      Product[]
  wishlist      Wishlist[]
  ratingsGiven  Rating[]
}

enum Role {
  BUYER
  SELLER
}

// ─────────────────────────────────────────────
// CENTROS DE ESTUDIO
// ─────────────────────────────────────────────
model StudyCenter {
  id          Int       @id @default(autoincrement())
  name        String
  description String?
  logoUrl     String?
  location    String?

  products    Product[]
}

// ─────────────────────────────────────────────
// PRODUCTOS / SERVICIOS
// ─────────────────────────────────────────────
model Product {
  id            Int         @id @default(autoincrement())
  title         String
  description   String
  price         Decimal     @db.Decimal(10, 2)
  imageUrl      String?
  tags          String[]    // ej: ["útiles", "libros", "ropa"]
  isActive      Boolean     @default(true)
  createdAt     DateTime    @default(now())

  seller        User        @relation(fields: [sellerId], references: [id])
  sellerId      Int

  studyCenter   StudyCenter? @relation(fields: [studyCenterId], references: [id])
  studyCenterId Int?

  wishlist      Wishlist[]
  ratings       Rating[]
}

// ─────────────────────────────────────────────
// LISTA DE DESEOS (corazón ❤️)
// ─────────────────────────────────────────────
model Wishlist {
  id        Int      @id @default(autoincrement())
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  product   Product  @relation(fields: [productId], references: [id])
  productId Int
  createdAt DateTime @default(now())

  @@unique([userId, productId]) // un usuario no puede "likear" el mismo producto dos veces
}

// ─────────────────────────────────────────────
// VALORACIONES
// ─────────────────────────────────────────────
model Rating {
  id        Int      @id @default(autoincrement())
  score     Int      // 1 a 5 estrellas
  comment   String?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  product   Product  @relation(fields: [productId], references: [id])
  productId Int

  @@unique([userId, productId]) // un usuario, una calificación por producto
}
```

---

## Fase 2 — Estructura del Backend

### 2.1 Estructura de carpetas

```
backend/
├── prisma/
│   ├── schema.prisma         ← definición de tablas
│   └── seed.ts               ← datos de prueba
├── src/
│   ├── index.ts              ← entrada (ya existe)
│   ├── config/
│   │   └── prisma.ts         ← instancia singleton de PrismaClient
│   ├── middlewares/
│   │   ├── auth.ts           ← verificar JWT
│   │   └── errorHandler.ts   ← manejo centralizado de errores
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── products.routes.ts
│   │   ├── studyCenters.routes.ts
│   │   └── wishlist.routes.ts
│   └── controllers/
│       ├── auth.controller.ts
│       ├── users.controller.ts
│       ├── products.controller.ts
│       ├── studyCenters.controller.ts
│       └── wishlist.controller.ts
├── .env                      ← DATABASE_URL, JWT_SECRET
└── package.json
```

### 2.2 Dependencias a instalar

```bash
# En /backend
npm install prisma @prisma/client bcryptjs jsonwebtoken dotenv cors
npm install -D @types/bcryptjs @types/jsonwebtoken @types/cors
npx prisma init
```

---

## Fase 3 — Autenticación

### 3.1 Endpoints de Auth

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Registrar usuario (BUYER o SELLER) |
| `POST` | `/api/auth/login` | Login → devuelve JWT |
| `GET`  | `/api/auth/me` | Perfil del usuario autenticado *(requiere JWT)* |

### 3.2 Flujo

```
POST /api/auth/register
  body: { email, password, fullName }
  → hashear password → guardar en BD → devolver token JWT

POST /api/auth/login
  body: { email, password }
  → buscar usuario → comparar password → firmar JWT con { id, role }
  → devolver { token, user }
```

### 3.3 Middleware JWT

Un middleware que verifica el token en el header `Authorization: Bearer <token>` antes de ejecutar cualquier endpoint protegido. Si el token no existe o es inválido, responde `401`. Si es válido, adjunta los datos del usuario a `req.user` y deja pasar la petición.

```typescript
// Ejemplo simplificado
const payload = jwt.verify(token, process.env.JWT_SECRET!);
req.user = payload; // disponible en el controller
```

---

## Fase 4 — Endpoints Necesarios (solo consulta del comprador)

> Solo se implementan endpoints de **lectura** y el **toggle de wishlist**. No hay creación de productos, centros ni vendedores desde la API — eso se hace con scripts.

### Mapa completo de endpoints

```
AUTH
  POST  /api/auth/register       → crear cuenta de usuario
  POST  /api/auth/login          → login, devuelve JWT
  GET   /api/auth/me             → quién soy yo (requiere JWT)

PRODUCTOS
  GET   /api/products            → listado de productos activos
  GET   /api/products?tag=ropa   → filtrar por tag
  GET   /api/products?search=x   → buscar por nombre
  GET   /api/products/:id        → detalle de un producto

CENTROS DE ESTUDIO
  GET   /api/study-centers            → listar todos
  GET   /api/study-centers/:id        → detalle de un centro

WISHLIST
  GET   /api/wishlist                 → mis favoritos (requiere JWT)
  POST  /api/wishlist/:productId      → toggle ❤️ (requiere JWT)

PERFIL
  GET   /api/users/me                 → mis datos (requiere JWT)
```

---

### 4.1 Home — Listado de productos

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/products` | Todos los productos activos | ❌ |
| `GET` | `/api/products?tag=libros` | Filtrar por tag | ❌ |
| `GET` | `/api/products?search=texto` | Buscar por título | ❌ |
| `GET` | `/api/products/:id` | Detalle de un producto | ❌ |

Cada producto devuelve: título, descripción, precio, imagen, vendedor (nombre), promedio de calificación y cantidad de favoritos.

---

### 4.2 Centros de Estudio

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/study-centers` | Listar todos los centros | ❌ |
| `GET` | `/api/study-centers/:id` | Detalle de un centro | ❌ |

Solo lectura. Los centros se crean directamente con un script SQL.

---

### 4.3 Wishlist (corazón ❤️)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/wishlist` | Mis productos favoritos | ✅ |
| `POST` | `/api/wishlist/:productId` | Toggle: agrega si no está, quita si está | ✅ |

El toggle en un solo `POST` simplifica el frontend: solo hace una llamada y el backend decide si agrega o quita. La respuesta devuelve `{ liked: true/false }`.

---

### 4.4 Perfil

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/api/users/me` | Datos del usuario autenticado | ✅ |

Devuelve: nombre, email, rol, avatar. Solo lectura por ahora.

---

### ¿Qué queda fuera de la API en esta fase?

| Funcionalidad | ¿Por qué fuera? | ¿Cómo se hace? |
|--------------|-----------------|----------------|
| Crear/editar productos | No hay UI para vendedor | Script SQL / seed |
| Crear centros de estudio | No hay UI de admin | Script SQL / seed |
| Crear vendedores | No hay UI de admin | Script SQL / seed |
| Subir imágenes | Sin formulario de creación | Rutas locales hardcodeadas en el seed |

---

## Fase 5 — Variables de Entorno y Configuración

### `.env` (en `/backend`)

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/uishop_db"
JWT_SECRET="una_clave_secreta_larga_y_aleatoria"
PORT=3000
```

### `config/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;
```

---

## Fase 6 — Seed de Datos (Scripts directos a la BD)

Como no hay UI de creación, todos los datos iniciales se insertan con un script `seed.ts` que corre directamente contra PostgreSQL vía Prisma.

**¿Qué debe incluir el seed?**

| Datos | Descripción |
|-------|-------------|
| Centros de estudio | 3–5 centros con nombre, descripción y ubicación |
| Usuarios vendedores | 2–3 perfiles con email, password hasheado, rol `SELLER` |
| Productos | 8–10 productos con título, precio, tags e `imageUrl` con ruta local |
| Usuario comprador de prueba | 1 usuario con rol `BUYER` para testear el login |

Ejemplo de imagen en el seed: `imageUrl: '/uploads/demo-cuaderno.jpg'` → se pone una imagen manualmente en la carpeta `/uploads` y el seed la referencia.

Ejecutar con: `npx prisma db seed`

---

## Resumen de Comandos

```bash
# 1. Instalar dependencias
cd backend
npm install prisma @prisma/client bcryptjs jsonwebtoken dotenv cors
npm install -D @types/bcryptjs @types/jsonwebtoken @types/cors

# 2. Inicializar Prisma
npx prisma init

# 3. Pegar el schema.prisma de la Fase 1

# 4. Crear la base de datos y aplicar migración
npx prisma migrate dev --name init

# 5. Poblar con datos de prueba
npx prisma db seed

# 6. Ver la BD visualmente (opcional)
npx prisma studio

# 7. Arrancar el servidor
npm run dev
```

---

## Orden de Implementación Sugerido

```
Fase 1  → Diseñar schema.prisma + ejecutar migración
Fase 2  → Estructura de carpetas del backend
Fase 5  → Variables de entorno (.env)
Fase 6  → Ejecutar seed (datos de prueba en BD)
Fase 3  → Auth (register / login / JWT middleware)
Fase 4a → GET productos (home + detalle)
Fase 4b → GET centros de estudio
Fase 4c → GET + toggle wishlist ❤️
Fase 4d → GET perfil
```

> El seed se ejecuta antes de los endpoints para tener datos reales con qué probar desde el primer momento.

---

> **Nota:** Para subir imágenes de productos se puede usar `multer` + almacenamiento local en `/uploads` o un servicio gratuito como [Cloudinary](https://cloudinary.com/) (free tier). Queda fuera del alcance inicial pero es fácil de agregar en una segunda iteración.

---

## Fase 7 — Imágenes (almacenamiento local)

> **En esta fase no hay formulario de subida**, así que Multer queda fuera por ahora. Las imágenes se gestionan así:

### Estrategia para el seed

1. Crear manualmente la carpeta `backend/uploads/`.
2. Poner ahí imágenes de prueba (jpg/png descargadas o de placeholder).
3. En el seed referenciarlas como `imageUrl: '/uploads/demo-producto.jpg'`.
4. El servidor expone esa carpeta como estática → el frontend las muestra con `<img src="http://localhost:3000/uploads/demo-producto.jpg" />`.

### Exponer `/uploads` como carpeta estática (una sola línea en `index.ts`)

```typescript
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
```

Eso es todo lo necesario para que las imágenes funcionen con el seed.

---

### ¿Cuándo entraría Multer?

Solo si en una fase posterior se agrega un formulario de creación de productos desde la UI. En ese caso Multer intercepta el `FormData` del frontend y guarda el archivo en `/uploads`. Pero para esta fase **no es necesario**.

### ¿Qué es Multer?

`multer` es un middleware de Express que **intercepta peticiones `multipart/form-data`** (el tipo de formulario que usan los inputs `<input type="file">`).

Sin Multer → `req.body` llega vacío cuando el frontend envía una imagen.  
Con Multer → el archivo se guarda en disco y `req.file` contiene toda la info.

### Flujo completo

```
[React] FormData con imagen + datos del producto
            ↓  POST /api/products
[Multer]  intercepta la petición
            ↓
          guarda el archivo en  /backend/uploads/abc123-producto.jpg
            ↓  req.file disponible
[Controller] guarda en DB:  imageUrl = "/uploads/abc123-producto.jpg"
            ↓
[React]  muestra la imagen con  <img src="http://localhost:3000/uploads/abc123-producto.jpg" />
```

---

### 7.1 Instalación

```bash
cd backend
npm install multer
npm install -D @types/multer
```

---

### 7.2 Configuración (`src/config/multer.ts`)

```typescript
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear la carpeta /uploads si no existe
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  // Carpeta donde se guardan los archivos
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  // Nombre único para evitar colisiones: timestamp + nombre original
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, uniqueName);
  },
});

// Solo acepta imágenes (jpg, png, webp, gif)
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpg, png, webp, gif)'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // máximo 5 MB
});
```

---

### 7.3 Exponer la carpeta `/uploads` como estática (`src/index.ts`)

```typescript
import path from 'path';

// Agrega esta línea ANTES de las rutas
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
```

Así cualquier imagen se puede acceder directamente desde el navegador:  
`http://localhost:3000/uploads/nombre-del-archivo.jpg`

---

### 7.4 Usar Multer en la ruta de productos

```typescript
// src/routes/products.routes.ts
import { Router } from 'express';
import { upload } from '../config/multer';
import { createProduct } from '../controllers/products.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// upload.single('image') → espera un campo llamado "image" en el FormData
router.post('/', authMiddleware, upload.single('image'), createProduct);

export default router;
```

---

### 7.5 Usar `req.file` en el controller

```typescript
// src/controllers/products.controller.ts
export const createProduct = async (req: Request, res: Response) => {
  const { title, description, price, tags } = req.body;
  const sellerId = (req as any).user.id;

  // Si viene imagen, construir la URL; si no, null
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const product = await prisma.product.create({
    data: {
      title,
      description,
      price: parseFloat(price),
      tags: JSON.parse(tags),   // el frontend debe enviarlo como JSON.stringify(array)
      imageUrl,
      sellerId,
    },
  });

  res.status(201).json(product);
};
```

---

### 7.6 Cómo enviar la imagen desde React (frontend)

```typescript
// En el componente del formulario
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', String(price));
  formData.append('tags', JSON.stringify(tags));   // array → string
  if (imageFile) formData.append('image', imageFile); // el File del input

  await fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    // NO pongas Content-Type manualmente, el navegador lo pone solo con el boundary
    body: formData,
  });
};
```

---

### 7.7 Estructura final de `/backend` con uploads

```
backend/
├── uploads/               ← aquí caen todas las imágenes subidas
│   ├── 1716823000-camiseta.jpg
│   └── 1716823100-cuaderno.png
├── prisma/
├── src/
│   ├── config/
│   │   ├── prisma.ts
│   │   └── multer.ts      ← nuevo
│   └── ...
└── .env
```

> **Tip:** Agrega `uploads/` al `.gitignore` para no subir imágenes al repositorio:
> ```
> # .gitignore
> uploads/
> ```

---

### Resumen: ¿Por qué NO necesitas Cloudinary para el proyecto de clase?

| Criterio | Multer local | Cloudinary |
|----------|-------------|------------|
| Configuración | 10 minutos | Crear cuenta + API keys |
| Funciona sin internet | ✅ Sí | ❌ No |
| Persiste al reiniciar | ✅ Sí (carpeta local) | ✅ Sí |
| Ideal para | Proyecto de clase / local | Producción real |
| Costo | Gratis | Free tier limitado |

**Conclusión:** Para este proyecto usa Multer + disco local. Si en el futuro quisieras desplegarlo en un servidor real, ahí sí valdría la pena Cloudinary — y la migración sería solo cambiar el `storage` de Multer.
