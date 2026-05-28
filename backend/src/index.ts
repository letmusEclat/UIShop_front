import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import productsRoutes from './routes/products.routes';
import studyCentersRoutes from './routes/studyCenters.routes';
import wishlistRoutes from './routes/wishlist.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env['PORT'] ?? 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Servir imágenes subidas (seed o futuro multer)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/study-centers', studyCentersRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Manejo centralizado de errores (debe ir al final)
app.use(errorHandler as any);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

