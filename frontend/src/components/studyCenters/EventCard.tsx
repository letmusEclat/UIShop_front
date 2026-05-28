import { FiCalendar, FiClock } from 'react-icons/fi';
import type { AppEvent } from '../../types';

interface EventCardProps {
  event: AppEvent;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        borderRadius: 'var(--radius-card)',
        background: '#fff',
        boxShadow: 'var(--card-shadow)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Banner image */}
      {event.imageUrl ? (
        <div style={{ height: 100, flexShrink: 0 }}>
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div
          style={{
            height: 100,
            flexShrink: 0,
            background: 'var(--primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
          }}
        >
          📅
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Category badge */}
        <span
          style={{
            alignSelf: 'flex-start',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 'var(--radius-chip)',
          }}
        >
          {event.category}
        </span>

        {/* Title */}
        <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', lineHeight: 1.3 }}>
          {event.title}
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{event.studyCenterName}</p>

        {/* Date & time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
            <FiCalendar size={13} /> {formatDate(event.date)}
          </span>
          {event.time && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
              <FiClock size={13} /> {event.time}
            </span>
          )}
        </div>

        {/* Action button */}
        <button
          style={{
            marginTop: 4,
            padding: '7px 0',
            borderRadius: 8,
            background: event.actionLabel === 'Registrarse' ? 'var(--primary)' : 'var(--primary-light)',
            color: event.actionLabel === 'Registrarse' ? '#fff' : 'var(--primary)',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {event.actionLabel}
        </button>
      </div>
    </div>
  );
}
