import { FiChevronRight, FiMapPin } from 'react-icons/fi';
import type { StudyCenter } from '../../types';

interface StudyCenterCardProps {
  center: StudyCenter;
  onClick: () => void;
}

export default function StudyCenterCard({ center, onClick }: StudyCenterCardProps) {
  const initial = center.name.charAt(0).toUpperCase();

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        background: '#fff',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--card-shadow)',
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      {/* Logo / Initial */}
      <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 10, overflow: 'hidden' }}>
        {center.logoUrl ? (
          <img src={center.logoUrl} alt={center.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--primary)',
            }}
          >
            {initial}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 3 }}>
          {center.name}
        </p>
        {center.location && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
            <FiMapPin size={11} />
            {center.location}
          </p>
        )}
        {center.description && (
          <p
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              marginTop: 3,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {center.description}
          </p>
        )}
      </div>

      <FiChevronRight size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
    </button>
  );
}
