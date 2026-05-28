import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { login, isLoggedIn } from '../services/auth';
import logoSrc from '../assets/logo.jpg';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Si ya está logueado, redirigir directamente
  useEffect(() => {
    if (isLoggedIn()) navigate('/home', { replace: true });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/home', { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f9f9f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {/* Ambient glow — lima arriba izquierda */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: '#bcf552',
          filter: 'blur(80px)',
          opacity: 0.4,
          top: -100,
          left: -100,
          pointerEvents: 'none',
        }}
      />
      {/* Ambient glow — amarillo abajo derecha */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: '#ffe24a',
          filter: 'blur(80px)',
          opacity: 0.4,
          bottom: -50,
          right: -50,
          pointerEvents: 'none',
        }}
      />

      {/* Squiggle decorativo — lima arriba derecha */}
      <svg
        style={{ position: 'absolute', top: '10%', right: '5%', width: 200, pointerEvents: 'none', zIndex: 0 }}
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 50 Q 30 10, 55 50 T 105 50 T 155 50 T 195 50" stroke="#bcf552" strokeWidth="6" strokeLinecap="round" fill="none" />
      </svg>
      {/* Squiggle decorativo — amarillo abajo izquierda */}
      <svg
        style={{ position: 'absolute', bottom: '15%', left: '5%', width: 150, transform: 'rotate(-15deg)', pointerEvents: 'none', zIndex: 0 }}
        viewBox="0 0 150 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 40 Q 30 70, 50 40 T 90 40 T 130 40" stroke="#ffe24a" strokeWidth="4" strokeDasharray="8 8" strokeLinecap="round" fill="none" />
      </svg>

      {/* Card principal */}
      <main
        style={{
          width: '100%',
          maxWidth: 420,
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: 12,
            border: '1px solid #c2c9b5',
            boxShadow: '0 20px 40px rgba(52, 99, 0, 0.06)',
            padding: 48,
          }}
        >
          {/* Header: logo + títulos */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32, textAlign: 'center' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #b7f47f',
                marginBottom: 12,
                flexShrink: 0,
              }}
            >
              <img src={logoSrc} alt="UIShop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1a1c1b', marginBottom: 4, lineHeight: '40px' }}>
              Bienvenido de nuevo
            </h1>
            <p style={{ fontSize: 16, color: '#42493a', lineHeight: '24px', margin: 0 }}>
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#42493a', marginBottom: 4 }}
              >
                Email
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FiMail size={20} color="#727a68" style={{ marginRight: 12, flexShrink: 0 }} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="estudiante@correo.uis.edu.co"
                  required
                  disabled={loading}
                  style={{
                    flex: 1,
                    border: 'none',
                    borderBottom: '2px solid #e2e3e1',
                    background: 'transparent',
                    borderRadius: 0,
                    padding: '12px 0',
                    fontSize: 16,
                    color: '#1a1c1b',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = '#346300')}
                  onBlur={(e) => (e.target.style.borderBottomColor = '#e2e3e1')}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 4 }}>
                <label htmlFor="password" style={{ fontSize: 12, fontWeight: 500, color: '#42493a' }}>
                  Contraseña
                </label>
                <a href="#" style={{ fontSize: 12, fontWeight: 500, color: '#346300', textDecoration: 'none' }}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FiLock size={20} color="#727a68" style={{ marginRight: 12, flexShrink: 0 }} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  style={{
                    flex: 1,
                    border: 'none',
                    borderBottom: '2px solid #e2e3e1',
                    background: 'transparent',
                    borderRadius: 0,
                    padding: '12px 0',
                    fontSize: 16,
                    color: '#1a1c1b',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = '#346300')}
                  onBlur={(e) => (e.target.style.borderBottomColor = '#e2e3e1')}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  fontSize: 14,
                  color: '#ba1a1a',
                  background: '#ffdad6',
                  padding: '8px 12px',
                  borderRadius: 8,
                }}
              >
                {error}
              </div>
            )}

            {/* Botón submit */}
            <div style={{ paddingTop: 12 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? '#c2c9b5' : '#bcf552',
                  color: '#346300',
                  fontWeight: 600,
                  fontSize: 14,
                  padding: '12px 24px',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'background 0.2s',
                }}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                {!loading && <FiArrowRight size={18} />}
              </button>
            </div>
          </form>

          {/* Footer: link a registro */}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ fontSize: 16, color: '#42493a', margin: 0 }}>
              ¿No tienes cuenta?{' '}
              <Link
                to="/register"
                style={{ fontWeight: 600, fontSize: 14, color: '#346300', textDecoration: 'none' }}
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
