import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import type { Product } from '../../types';

const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: number) => void;
  style?: React.CSSProperties;
}

export default function ProductCard({ product, isWishlisted = false, onToggleWishlist, style }: ProductCardProps) {
  const initial = product.title.charAt(0).toUpperCase();

  return (
    <div
      style={{
        width: 170,
        flexShrink: 0,
        borderRadius: 'var(--radius-card)',
        background: '#fff',
        boxShadow: 'var(--card-shadow)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 140 }}>
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
              fontSize: 40,
              fontWeight: 700,
              color: 'var(--primary)',
            }}
          >
            {initial}
          </div>
        )}

        {/* Wishlist heart */}
        <button
          onClick={() => onToggleWishlist?.(product.id)}
          aria-label={isWishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: '#fff',
            borderRadius: '50%',
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          }}
        >
          {isWishlisted
            ? <FaHeart size={14} color="var(--primary)" />
            : <FiHeart size={14} color="var(--text-muted)" />}
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '10px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
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
        <p style={{ marginTop: 'auto', fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>
          {formatCOP(product.price)}
        </p>
      </div>
    </div>
  );
}
