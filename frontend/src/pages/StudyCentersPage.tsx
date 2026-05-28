import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';
import StudyCenterCard from '../components/studyCenters/StudyCenterCard';
import EventCard from '../components/studyCenters/EventCard';
import { useStudyCenters } from '../hooks/useStudyCenters';
import { fetchEvents } from '../services/api';
import type { AppEvent } from '../types';

export default function StudyCentersPage() {
  const navigate = useNavigate();
  const { centers, loading } = useStudyCenters();
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <div style={{ paddingBottom: 'var(--bottom-nav-height)' }}>

      {/* AppBar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '16px 16px 12px',
          background: '#fff',
          borderBottom: '1px solid var(--border)',
        }}
      >
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
      </header>

      <div style={{ padding: '20px 16px 8px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Centros de Estudio</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Explora los centros de estudio y sus productos disponibles
        </p>
      </div>

      {/* Próximos Eventos */}
      {events.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 10px' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Próximos Eventos</h2>
          </div>
          <div className="scroll-x" style={{ display: 'flex', gap: 12, padding: '0 16px 4px' }}>
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Centros de estudio */}
      <section style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Centros de estudio</h2>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Cargando...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {centers.map(center => (
              <StudyCenterCard
                key={center.id}
                center={center}
                onClick={() => navigate(`/study-centers/${center.id}`)}
              />
            ))}
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
}

