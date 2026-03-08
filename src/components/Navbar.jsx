import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useIsMobile } from '../hooks/useMediaQuery'

export default function Navbar({ page, setPage }) {
  const { dark, setDark, colors } = useTheme()
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const linkStyle = {
    fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
    color: colors.bark, background: 'none', border: 'none', cursor: 'pointer',
    padding: isMobile ? '14px 0' : 0,
    fontFamily: "'Outfit', sans-serif",
    display: 'block', width: '100%', textAlign: isMobile ? 'center' : 'left',
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isMobile ? '16px 24px' : '20px 48px',
        background: colors.navBg,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.border}`,
        transition: 'background 0.4s',
      }}>
        {/* Logo */}
        <span
          onClick={() => { setPage('home'); window.scrollTo(0, 0); setMenuOpen(false) }}
          style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 600, letterSpacing: '0.08em', color: colors.soil, cursor: 'pointer' }}
        >
          forma<span style={{ color: '#b05a3a' }}>.</span>
        </span>

        {/* Desktop nav */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: 32, listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
            {page === 'detail' ? (
              <li><button style={linkStyle} onClick={() => { setPage('home'); setTimeout(() => scrollTo('projeler'), 80) }}>← Geri</button></li>
            ) : (
              <>
                <li><button style={linkStyle} onClick={() => scrollTo('projeler')}>Projeler</button></li>
                <li><button style={linkStyle} onClick={() => scrollTo('hakkimizda')}>Hakkımızda</button></li>
                <li><button style={linkStyle} onClick={() => scrollTo('iletisim')}>İletişim</button></li>
              </>
            )}
            <li>
              <button onClick={() => setDark(d => !d)} style={{
                background: 'none', border: `1px solid ${colors.border}`, borderRadius: 20,
                padding: '6px 14px', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: colors.bark, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
              }}>
                {dark ? '☀ Aydınlık' : '☽ Karanlık'}
              </button>
            </li>
          </ul>
        )}

        {/* Mobile sağ — tema + hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setDark(d => !d)} style={{
              background: 'none', border: `1px solid ${colors.border}`, borderRadius: 20,
              padding: '5px 10px', fontSize: 10, color: colors.bark, cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
            }}>
              {dark ? '☀' : '☽'}
            </button>
            <button onClick={() => setMenuOpen(o => !o)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
              display: 'flex', flexDirection: 'column', gap: 5,
            }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 1.5, background: colors.soil,
                  transition: 'transform 0.3s, opacity 0.3s',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                    : i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 57, left: 0, right: 0, zIndex: 99,
          background: colors.navBg, backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${colors.border}`,
          padding: '8px 0 16px',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-110%)',
          opacity: menuOpen ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
          pointerEvents: menuOpen ? 'all' : 'none',
        }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: '0 24px' }}>
            {page === 'detail' ? (
              <li><button style={linkStyle} onClick={() => { setPage('home'); setMenuOpen(false) }}>← Geri</button></li>
            ) : (
              <>
                <li style={{ borderBottom: `1px solid ${colors.border}` }}><button style={linkStyle} onClick={() => scrollTo('projeler')}>Projeler</button></li>
                <li style={{ borderBottom: `1px solid ${colors.border}` }}><button style={linkStyle} onClick={() => scrollTo('hakkimizda')}>Hakkımızda</button></li>
                <li><button style={linkStyle} onClick={() => scrollTo('iletisim')}>İletişim</button></li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  )
}
