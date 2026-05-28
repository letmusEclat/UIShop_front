const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

// Misma clave que lee authHeader() en api.ts para que los headers funcionen automáticamente
const TOKEN_KEY = 'token';
const USER_KEY = 'uishop_user';

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  role: 'BUYER' | 'SELLER';
  avatarUrl: string | null;
  isVerified: boolean;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(err.error ?? 'Credenciales inválidas');
  }
  const data = await res.json() as { token: string; user: AuthUser };
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return !!getToken();
}
