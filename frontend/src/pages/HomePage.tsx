import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';
import SearchBar from '../components/home/SearchBar';
import CategoryChips from '../components/home/CategoryChips';
import PromoBanner from '../components/home/PromoBanner';
import ProductCard from '../components/home/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useWishlist } from '../hooks/useWishlist';
import { isLoggedIn } from '../services/auth';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const { products, loading } = useProducts({
    tag: activeCategory || undefined,
    search: searchQuery || undefined,
  });
  const { items: wishlistItems, toggle } = useWishlist();
  const wishlistedIds = new Set(wishlistItems.map(i => i.productId));

  const handleToggle = async (productId: number) => {
    if (!isLoggedIn()) { navigate('/login'); return; }
    await toggle(productId);
  };

  return (
    <div style={{ paddingBottom: 'var(--bottom-nav-height)' }}>

      {/* AppBar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 16px 8px',
          background: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>U</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>UiShop</span>
        </div>
        <button
          aria-label="Buscar"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--chip-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FiSearch size={18} color="var(--text-muted)" />
        </button>
      </header>

      {/* Search */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Category chips */}
      <CategoryChips active={activeCategory} onChange={setActiveCategory} />

      {/* Promo banner */}
      <PromoBanner
        badge="NUEVO"
        title="¡Oferta de último momento!"
        subtitle="Descubre los mejores platillos preparados por estudiantes de la UIS."
        imageUrl="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80"
      />

      {/* Destacados */}
      <section style={{ padding: '0 16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 700 }}>Destacados</h2>
          <button style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 500 }}>
            Ver todos →
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Cargando...
          </div>
        ) : (
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingBottom: 16 }}
          >
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistedIds.has(product.id)}
                onToggleWishlist={handleToggle}
                style={{ width: '100%', flexShrink: 1 }}
              />
            ))}
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
}

