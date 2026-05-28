import { FiTrash2 } from 'react-icons/fi';
import type { WishlistItem } from '../../types';

const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: (productId: number) => void;
}

export default function WishlistCard({ item, onRemove }: WishlistCardProps) {
  const { product } = item;
  const initial = product.title.charAt(0).toUpperCase();

  return (
    <div
      style={{
        borderRadius: 'var(--radius-card)',
        background: '#fff',
        boxShadow: 'var(--card-shadow)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 130 }}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 700,
              color: 'var(--primary)',
            }}
          >
            {initial}
          </div>
        )}

        {/* Remove button */}
        <button
          onClick={() => onRemove(product.id)}
          aria-label="Quitar de wishlist"
          style={{
            position: 'absolute',
            top: 7,
            right: 7,
            background: '#fff',
            borderRadius: '50%',
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          }}
        >
          <FiTrash2 size={13} color="#ef4444" />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '10px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text)',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.title}
        </p>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>
          {formatCOP(product.price)}
        </p>
      </div>
    </div>
  );
}
