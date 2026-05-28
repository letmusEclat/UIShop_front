import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { AuthRequest } from '../middlewares/auth';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, fullName } = req.body as { email?: string; password?: string; fullName?: string };

  if (!email || !password || !fullName) {
    res.status(400).json({ error: 'email, password y fullName son requeridos' });
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ error: 'El email ya está registrado' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, fullName },
    select: { id: true, email: true, fullName: true, role: true, createdAt: true },
  });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env['JWT_SECRET']!,
    { expiresIn: '7d' }
  );

  res.status(201).json({ token, user });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: 'email y password son requeridos' });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env['JWT_SECRET']!,
    { expiresIn: '7d' }
  );

  const { passwordHash: _omit, ...safeUser } = user;
  res.json({ token, user: safeUser });
};

export const me = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as AuthRequest).user!.id;

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
    },
  });

  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  res.json(user);
};

