import { useState, useEffect, useCallback } from 'react';
import { fetchWishlist, addToWishlist, removeFromWishlist, toggleWishlist } from '../services/api';
import type { WishlistItem } from '../types';

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetchWishlist()
      .then(setItems)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // En modo mock usa toggleWishlist (add/remove en un solo call).
  // En real API: chequea el estado local y llama POST o DELETE según corresponda.
  const toggle = async (productId: number) => {
    const isLiked = items.some((i) => i.productId === productId);
    if (isLiked) {
      await removeFromWishlist(productId);
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    } else {
      await addToWishlist(productId);
      load(); // refetch para obtener el WishlistItem completo del backend
    }
  };

  // Fallback para mock (ambas rutas funcionan igual en mock)
  const toggleMock = async (productId: number) => {
    await toggleWishlist(productId);
    load();
  };

  const remove = async (productId: number) => {
    await removeFromWishlist(productId);
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  return { items, loading, error, toggle, remove };
}
