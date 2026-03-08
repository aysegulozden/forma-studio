import { useTheme } from '../context/ThemeContext'
import { useIsMobile } from '../hooks/useMediaQuery'
import SectionLabel from '../components/SectionLabel'

export default function ProjectDetail({ project, setPage }) {
  const { colors } = useTheme()
  const isMobile = useIsMobile()

  if (!project) return null

  const location = project.tag.split('·')[1]?.trim()

  return (
    <section style={{ padding: isMobile ? '90px 24px 60px' : '120px 56px 100px', minHeight: '100vh', background: colors.cream }}>

      <button
        onClick={() => { setPage('home'); setTimeout(() => document.getElementById('projeler')?.scrollIntoView({ behavior: 'smooth' }), 80) }}
        style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:colors.bark, background:'none', border:'none', cursor:'pointer', marginBottom:40, fontFamily:"'Outfit',sans-serif" }}
      >
        ← Tüm Projeler
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 36 : 72,
        alignItems: 'start',
      }}>

        {/* Görsel + meta */}
        <div>
          <div style={{ width:'100%', aspectRatio: isMobile ? '4/3' : '3/4', borderRadius:4, background:project.gradient, marginBottom:16 }} />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[['Yıl',project.year],['Alan',project.area],['Süre',project.duration],['Konum',location]].map(([label,value]) => (
              <div key={label} style={{ padding: isMobile ? 12 : 16, border:`1px solid ${colors.border}`, borderRadius:4, background:colors.bg2 }}>
                <div style={{ fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:'#8a9e84',marginBottom:5 }}>{label}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMobile ? 15 : 18, color:colors.soil }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* İçerik */}
        <div>
          <SectionLabel>{project.tag}</SectionLabel>

          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMobile ? '28px' : 'clamp(32px,3.5vw,52px)', fontWeight:300, color:colors.soil, marginBottom:16 }}>
            <em style={{ fontStyle:'italic',color:'#b05a3a' }}>{project.name}</em>
          </h2>

          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
            {project.tags.map(tag => (
              <span key={tag} style={{ fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase',padding:'5px 12px',border:`1px solid ${colors.border}`,borderRadius:20,color:colors.bark }}>
                {tag}
              </span>
            ))}
          </div>

          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight:1.9, color:colors.bark, marginBottom:28 }}>
            {project.description}
          </p>

          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMobile ? 18 : 22, color:colors.soil, marginBottom:16 }}>
            Proje Detayları
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {project.details.map((detail, i) => (
              <div key={i} style={{ display:'flex', gap:12, fontSize: isMobile ? 13 : 14, color:colors.bark, lineHeight:1.6 }}>
                <span style={{ color:'#b05a3a',fontSize:12,paddingTop:3,flexShrink:0 }}>→</span>
                {detail}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
