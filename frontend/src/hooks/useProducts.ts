import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import type { Product } from '../types';

export function useProducts(filters?: { tag?: string; search?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tag = filters?.tag;
  const search = filters?.search;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProducts({ tag, search })
      .then(setProducts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [tag, search]);

  return { products, loading, error };
}
