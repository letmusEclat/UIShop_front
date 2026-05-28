const CATEGORIES = [
  { label: 'Todos',      value: '' },
  { label: 'Comida',     value: 'comida' },
  { label: 'Bebidas',    value: 'bebida' },
  { label: 'Snacks',     value: 'snack' },
  { label: 'Saludable',  value: 'saludable' },
  { label: 'Útiles',     value: 'útiles' },
  { label: 'Libros',     value: 'libros' },
  { label: 'Accesorios', value: 'accesorios' },
  { label: 'Servicios',  value: 'servicios' },
];

interface CategoryChipsProps {
  active: string;
  onChange: (v: string) => void;
}

export default function CategoryChips({ active, onChange }: CategoryChipsProps) {
  return (
    <div
      className="scroll-x"
      style={{
        display: 'flex',
        gap: 8,
        padding: '4px 16px 12px',
      }}
    >
      {CATEGORIES.map(cat => {
        const isActive = cat.value === active;
        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            style={{
              flexShrink: 0,
              padding: '6px 16px',
              borderRadius: 'var(--radius-chip)',
              fontSize: 13,
              fontWeight: 500,
              background: isActive ? 'var(--primary)' : 'var(--chip-bg)',
              color: isActive ? '#fff' : 'var(--text-muted)',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
