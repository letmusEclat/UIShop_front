import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiHeart, FiUser } from 'react-icons/fi';

const TABS = [
  { to: '/home', label: 'Inicio', Icon: FiHome },
  { to: '/study-centers', label: 'Centros', Icon: FiBook },
  { to: '/wishlist', label: 'Wishlist', Icon: FiHeart },
  { to: '/profile', label: 'Perfil', Icon: FiUser },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        height: 'var(--bottom-nav-height)',
        background: '#fff',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        zIndex: 100,
      }}
    >
      {TABS.map(({ to, label, Icon }) => {
        const active = pathname.startsWith(to);
        return (
          <NavLink
            key={to}
            to={to}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              color: active ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: active ? 600 : 400,
              fontSize: 11,
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 28,
                borderRadius: 'var(--radius-chip)',
                background: active ? 'var(--primary-light)' : 'transparent',
              }}
            >
              <Icon size={20} />
            </span>
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
}
