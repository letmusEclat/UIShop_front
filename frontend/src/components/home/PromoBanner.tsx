interface PromoBannerProps {
  badge?: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
}

export default function PromoBanner({ badge, title, subtitle, imageUrl }: PromoBannerProps) {
  return (
    <div
      style={{
        margin: '0 16px 20px',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        position: 'relative',
        height: 180,
        background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : 'var(--primary)',
      }}
    >
      {/* dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)',
        }}
      />

      {badge && (
        <span
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: '#fff',
            color: 'var(--primary)',
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 'var(--radius-chip)',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {badge}
        </span>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 14px',
        }}
      >
        <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
          {title}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, lineHeight: 1.4 }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
