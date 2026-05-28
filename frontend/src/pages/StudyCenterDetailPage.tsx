import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiClock, FiCreditCard, FiWifi } from 'react-icons/fi';
import { MdAcUnit, MdMicrowave, MdVideogameAsset } from 'react-icons/md';
import BottomNav from '../components/layout/BottomNav';
import ProductCard from '../components/home/ProductCard';
import { fetchStudyCenterById, fetchStudyCenterProducts } from '../services/api';
import { useWishlist } from '../hooks/useWishlist';
import { isLoggedIn } from '../services/auth';
import type { StudyCenter, Product } from '../types';

const AMENITY_ICONS: Record<string, { icon: React.ReactNode; label: string }> = {
  wifi:      { icon: <FiWifi size={16} />,       label: 'Wi-Fi' },
  ac:        { icon: <MdAcUnit size={16} />,      label: 'Aire acond.' },
  microwave: { icon: <MdMicrowave size={16} />,   label: 'Microondas' },
  games:     { icon: <MdVideogameAsset size={16} />, label: 'Videojuegos' },
};

export default function StudyCenterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const centerId = Number(id);

  const [center, setCenter] = useState<StudyCenter | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { items: wishlistItems, toggle } = useWishlist();
  const wishlistedIds = new Set(wishlistItems.map(i => i.productId));

  const handleToggle = async (productId: number) => {
    if (!isLoggedIn()) { navigate('/login'); return; }
    await toggle(productId);
  };

  useEffect(() => {
    if (!centerId) return;
    setLoading(true);
    Promise.all([
      fetchStudyCenterById(centerId),
      fetchStudyCenterProducts(centerId),
    ]).then(([c, p]) => {
      setCenter(c ?? null);
      setProducts(p);
    }).finally(() => setLoading(false));
  }, [centerId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--text-muted)' }}>Cargando...</p>
      </div>
    );
  }

  if (!center) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Centro no encontrado.</p>
        <button onClick={() => navigate(-1)} style={{ marginTop: 12, color: 'var(--primary)', fontWeight: 600 }}>
          ← Volver
        </button>
      </div>
    );
  }

  const initial = center.name.charAt(0).toUpperCase();

  return (
    <div style={{ paddingBottom: 'var(--bottom-nav-height)' }}>

      {/* TopBar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 16px',
          background: '#fff',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver"
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'var(--chip-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FiArrowLeft size={18} />
        </button>
        <span style={{ fontWeight: 700, fontSize: 16 }}>UiShop</span>
      </header>

      {/* Hero image */}
      <div style={{ width: '100%', height: 200, background: 'var(--primary-light)', overflow: 'hidden' }}>
        {center.logoUrl ? (
          <img src={center.logoUrl} alt={center.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 64,
              fontWeight: 800,
              color: 'var(--primary)',
            }}
          >
            {initial}
          </div>
        )}
      </div>

      {/* Info section */}
      <div style={{ padding: '16px 16px 0' }}>
        {/* Badge */}
        <span
          style={{
            display: 'inline-block',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 12px',
            borderRadius: 'var(--radius-chip)',
            marginBottom: 8,
          }}
        >
          Centro de Estudio
        </span>

        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{center.name}</h1>

        {center.location && (
          <p style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
            <FiMapPin size={14} /> {center.location}
          </p>
        )}

        {center.description && (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
            "{center.description}"
          </p>
        )}

        {/* Info row: horario + membresía */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginBottom: 16,
          }}
        >
          {center.schedule && (
            <div
              style={{
                flex: 1,
                background: 'var(--chip-bg)',
                borderRadius: 10,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <FiClock size={15} color="var(--primary)" />
              <div>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>Horario</p>
                <p style={{ fontSize: 11, fontWeight: 600 }}>{center.schedule}</p>
              </div>
            </div>
          )}
          <div
            style={{
              flex: 1,
              background: 'var(--chip-bg)',
              borderRadius: 10,
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <FiCreditCard size={15} color="var(--primary)" />
            <div>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>Membresía</p>
              <p style={{ fontSize: 11, fontWeight: 600 }}>
                {center.membershipFree ? 'Gratuita' : 'De pago'}
              </p>
            </div>
          </div>
        </div>

        {/* Amenidades */}
        {center.amenities && center.amenities.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Comodidades</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {center.amenities.map(key => {
                const info = AMENITY_ICONS[key];
                if (!info) return null;
                return (
                  <span
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      fontSize: 12,
                      fontWeight: 500,
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-chip)',
                    }}
                  >
                    {info.icon} {info.label}
                  </span>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Productos */}
      {products.length > 0 && (
        <section style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Productos</h2>
            <button style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 500 }}>Ver todo →</button>
          </div>
          <div className="scroll-x" style={{ display: 'flex', gap: 12, paddingBottom: 16 }}>
            {products.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlistedIds.has(p.id)}
                onToggleWishlist={handleToggle}
              />
            ))}
          </div>
        </section>
      )}

      <BottomNav />
    </div>
  );
}

