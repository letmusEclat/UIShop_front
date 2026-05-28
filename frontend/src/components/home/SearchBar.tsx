import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Buscar productos, servicios...' }: SearchBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--chip-bg)',
        borderRadius: 'var(--radius-chip)',
        padding: '10px 14px',
        margin: '12px 16px',
      }}
    >
      <FiSearch size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          outline: 'none',
          fontSize: 14,
          color: 'var(--text)',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );
}
