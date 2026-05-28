import { useState, useMemo } from 'react';
import { FiHeart } from 'react-icons/fi';
import BottomNav from '../components/layout/BottomNav';
import SearchBar from '../components/home/SearchBar';
import WishlistCard from '../components/wishlist/WishlistCard';
import { useWishlist } from '../hooks/useWishlist';

type SortBy = 'price' | 'date';

export default function WishlistPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const { items, loading, remove } = useWishlist();

  const filtered = useMemo(() => {
    let result = [...items];
    if (search.trim()) {
      result = result.filter(i =>
        i.product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy === 'price') {
      result.sort((a, b) => a.product.price - b.product.price);
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [items, search, sortBy]);

  return (
    <div style={{ paddingBottom: 'var(--bottom-nav-height)' }}>

      {/* AppBar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 16px 12px',
          background: '#fff',
          borderBottom: '1px solid var(--border)',
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
          <span style={{ fontWeight: 700, fontSize: 18 }}>UiShop</span>
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#fce7f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FiHeart size={18} color="#ec4899" />
        </div>
      </header>

      {/* Page header */}
      <div
        style={{
          padding: '20px 16px 4px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: '#fce7f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <FiHeart size={22} color="#ec4899" />
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 3 }}>My Wishlist</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Your favorite study snacks and essentials.
          </p>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search your wishlist..."
      />

      {/* Sort chips */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 16px 14px',
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--text-muted)', flexShrink: 0 }}>Sort by:</span>
        {(['price', 'date'] as SortBy[]).map(opt => (
          <button
            key={opt}
            onClick={() => setSortBy(opt)}
            style={{
              padding: '5px 14px',
              borderRadius: 'var(--radius-chip)',
              fontSize: 13,
              fontWeight: 500,
              background: sortBy === opt ? 'var(--primary)' : 'var(--chip-bg)',
              color: sortBy === opt ? '#fff' : 'var(--text-muted)',
            }}
          >
            {opt === 'price' ? 'Precio' : 'Fecha'}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
          Cargando...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 16px' }}>
          <FiHeart size={40} color="var(--border)" style={{ marginBottom: 12 }} />
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {search ? 'No hay productos que coincidan.' : 'Tu wishlist está vacía.'}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            padding: '0 16px 16px',
          }}
        >
          {filtered.map(item => (
            <WishlistCard
              key={item.id}
              item={item}
              onRemove={remove}
            />
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}

