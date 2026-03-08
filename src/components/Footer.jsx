import { useTheme } from '../context/ThemeContext'
import { useIsMobile } from '../hooks/useMediaQuery'

export default function Footer() {
  const { colors } = useTheme()
  const isMobile = useIsMobile()

  return (
    <footer style={{
      background: colors.bgFooter,
      padding: isMobile ? '28px 24px' : '36px 56px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? 20 : 0,
    }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:'#c4a882', fontWeight:300 }}>
        forma<span style={{ color:'#b05a3a' }}>.</span>
      </div>
      <span style={{ fontSize:10, color:'rgba(196,168,130,0.4)', letterSpacing:'0.1em' }}>
        © 2025 Forma Studio. Tüm hakları saklıdır.
      </span>
      <ul style={{ display:'flex', gap:20, listStyle:'none', margin:0, padding:0 }}>
        {['Instagram','Behance','LinkedIn'].map(l => (
          <li key={l}>
            <a href="#" style={{ fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(196,168,130,0.45)',textDecoration:'none' }}>{l}</a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
