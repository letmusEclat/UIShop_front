import { useNavigate } from 'react-router-dom';
import { FiChevronRight, FiShoppingBag, FiSettings, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import BottomNav from '../components/layout/BottomNav';
import { logout, getStoredUser } from '../services/auth';

const MOCK_USER = {
  fullName: 'María González',
  major: 'Ingeniería de Sistemas',
  email: 'maria.gonzalez@correo.uis.edu.co',
  avatarInitials: 'MG',
};

const MENU_ITEMS = [
  {
    icon: <FiShoppingBag size={20} />,
    label: 'Mis Pedidos',
    description: 'Track your recent purchases',
  },
  {
    icon: <FiSettings size={20} />,
    label: 'Configuración',
    description: 'Account, privacy, notifications',
  },
  {
    icon: <FiHelpCircle size={20} />,
    label: 'Ayuda',
    description: 'FAQs, support, contact us',
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const storedUser = getStoredUser();

  const displayName = storedUser?.fullName ?? MOCK_USER.fullName;
  const displayEmail = storedUser?.email ?? MOCK_USER.email;
  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  const roleLabel = storedUser?.role === 'SELLER' ? 'Vendedor' : 'Comprador';

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div style={{ paddingBottom: 'var(--bottom-nav-height)', background: 'var(--bg-page)', minHeight: '100dvh' }}>

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
        <span style={{ fontWeight: 700, fontSize: 18 }}>UiShop</span>
      </header>

      <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Profile card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--card-shadow)',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {initials}
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 3 }}>{displayName}</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{displayEmail}</p>
          </div>

          {/* Rol */}
          <span
            style={{
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              fontSize: 12,
              fontWeight: 600,
              padding: '4px 14px',
              borderRadius: 'var(--radius-chip)',
            }}
          >
            {roleLabel}
          </span>
        </div>

        {/* Menu items */}
        <div
          style={{
            background: '#fff',
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--card-shadow)',
            overflow: 'hidden',
          }}
        >
          {MENU_ITEMS.map((item, idx) => (
            <button
              key={item.label}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                background: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                borderBottom: idx < MENU_ITEMS.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.label}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.description}</p>
              </div>
              <FiChevronRight size={18} color="var(--text-muted)" />
            </button>
          ))}
        </div>

        {/* Log out */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '13px 16px',
            borderRadius: 'var(--radius-card)',
            border: '1.5px solid #ef4444',
            background: 'transparent',
            color: '#ef4444',
            fontWeight: 700,
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            marginBottom: 8,
          }}
        >
          <FiLogOut size={18} />
          Cerrar sesión
        </button>

      </div>

      <BottomNav />
    </div>
  );
}

