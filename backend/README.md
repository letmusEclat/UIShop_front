# UIShop — Backend

API REST construida con **Node.js + TypeScript + Express 5 + Prisma 7 + PostgreSQL**.

---

## Requisitos previos

- Node.js ≥ 20
- Docker Desktop (para la base de datos)
- Archivo `.env` en esta carpeta (ver sección de variables)

---

## Variables de entorno

Crea el archivo `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:randompassword@localhost:5432/uishop_db"
JWT_SECRET="uishop_jwt_secret_cambia_esto"
PORT=3000
```

---

## Levantar la base de datos

Desde la **raíz del proyecto** (`UIShop_front/`):

```bash
docker compose up -d
```

Esto inicia PostgreSQL 16 en `localhost:5432` con persistencia en `./docker-data/postgres/`.

Para detenerla:

```bash
docker compose down
```

---

## Instalación

```bash
cd backend
npm install
```

---

## Migración

Aplica el esquema a la base de datos:

```bash
npx prisma migrate dev --name init
```

Si el esquema cambia en el futuro, vuelve a correr el mismo comando con un nombre descriptivo.

---

## Seed — datos de prueba

Puebla la base de datos con centros de estudio, vendedores, un comprador y 10 productos:

```bash
npx prisma db seed
```

**Cuentas disponibles tras el seed:**

| Rol      | Email                                     | Password        |
|----------|-------------------------------------------|-----------------|
| Comprador | `estudiante@correo.uis.edu.co`           | `estudiante123` |
| Vendedor | `tiendauis@correo.uis.edu.co`            | `vendedor123`   |
| Vendedor | `papeleria.norte@correo.uis.edu.co`      | `vendedor123`   |

> El seed usa `upsert`, es seguro ejecutarlo más de una vez.

---

## Servidor de desarrollo

```bash
npm run dev
```

Corre en `http://localhost:3000` con recarga automática via nodemon.

---

## Endpoints

Las rutas marcadas con ✅ requieren el header:
```
Authorization: Bearer <token>
```

### Auth

| Método | Ruta | Auth | Descripción |
|--------|------|:----:|-------------|
| POST | `/api/auth/register` | | Crea cuenta. Body: `{ email, password, fullName }`. Devuelve `{ token, user }` |
| POST | `/api/auth/login` | | Login. Body: `{ email, password }`. Devuelve `{ token, user }` |
| GET | `/api/auth/me` | ✅ | Perfil del usuario autenticado |

### Productos

| Método | Ruta | Auth | Descripción |
|--------|------|:----:|-------------|
| GET | `/api/products` | | Todos los productos activos, ordenados por fecha desc |
| GET | `/api/products?tag=ropa` | | Filtra por tag (coincidencia exacta en el array) |
| GET | `/api/products?search=cuaderno` | | Busca en el título (case-insensitive) |
| GET | `/api/products/:id` | | Detalle con `seller`, `studyCenter`, `ratings`, `avgRating`, `wishlistCount` |

### Centros de estudio

| Método | Ruta | Auth | Descripción |
|--------|------|:----:|-------------|
| GET | `/api/study-centers` | | Lista todos, incluye `productCount` por centro |
| GET | `/api/study-centers/:id` | | Detalle con sus productos activos (`avgRating`, `wishlistCount` por producto) |

### Wishlist

| Método | Ruta | Auth | Descripción |
|--------|------|:----:|-------------|
| GET | `/api/wishlist` | ✅ | Favoritos del usuario con datos del producto |
| POST | `/api/wishlist/:productId` | ✅ | Toggle: devuelve `{ liked: true }` si agrega, `{ liked: false }` si quita |

### Perfil

| Método | Ruta | Auth | Descripción |
|--------|------|:----:|-------------|
| GET | `/api/users/me` | ✅ | Datos del usuario: email, nombre, rol, avatar, `wishlistCount`, `ratingsCount` |
