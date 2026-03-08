import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'
import { useIsMobile, useIsTablet } from '../hooks/useMediaQuery'
import SectionLabel from '../components/SectionLabel'
import { PROJECTS } from '../data'

export default function Projects({ setPage, setActiveProject }) {
  const { colors } = useTheme()
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [headerRef, headerInView] = useInView(0.1)
  const [gridRef, gridInView] = useInView(0.05)

  return (
    <section id="projeler" style={{ padding: isMobile ? '80px 24px' : '120px 56px', background: colors.bg2, overflow: 'hidden' }}>

      {/* Header */}
      <div ref={headerRef} style={{ marginBottom: isMobile ? 40 : 72 }}>
        <SectionLabel>Çalışmalarımız</SectionLabel>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isMobile ? '36px' : 'clamp(38px,4.5vw,60px)',
            fontWeight: 300, color: colors.soil,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          }}>
            Seçili <em style={{ fontStyle: 'italic', color: '#b05a3a' }}>projeler</em>
          </h2>
          {!isMobile && (
            <p style={{
              fontSize: 15, color: colors.bark, lineHeight: 1.75, maxWidth: 300,
              opacity: headerInView ? 1 : 0,
              transition: 'opacity 0.8s ease 0.5s',
            }}>
              Her proje, müşterimizin yaşam biçimini yansıtan özgün bir anlatı ile şekillenir.
            </p>
          )}
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(12,1fr)',
        gap: isMobile ? 28 : 20,
      }}>
        {PROJECTS.map((project, i) => {
          const spans = [[1,8],[8,13],[1,5],[5,13]]
          const [s1, s2] = spans[i]
          const delay = i * 0.15

          return (
            <div
              key={project.id}
              onClick={() => { setActiveProject(project); setPage('detail'); window.scrollTo(0,0) }}
              style={{
                gridColumn: isMobile || isTablet ? 'auto' : `${s1}/${s2}`,
                borderRadius: 4, overflow: 'visible',
                cursor: 'pointer', position: 'relative',
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
                transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.ov').style.opacity = 1
                e.currentTarget.querySelector('.pc-img-bg').style.transform = 'scale(1.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.ov').style.opacity = 0
                e.currentTarget.querySelector('.pc-img-bg').style.transform = 'scale(1)'
              }}
            >
              <div style={{ borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '100%', aspectRatio: isMobile ? '4/3' : (i===0||i===3 ? '16/9' : '4/3'), position: 'relative', minHeight: 180 }}>
                  <div className="pc-img-bg" style={{ width: '100%', height: '100%', background: project.gradient, transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)' }} />
                  <div className="ov" style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(40,28,18,.85),transparent 60%)',opacity:0,transition:'opacity 0.4s',display:'flex',alignItems:'flex-end',padding:20 }}>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:'rgba(255,255,255,.75)',fontStyle:'italic' }}>Detayları gör →</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '14px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMobile ? 20 : 19, color:colors.soil }}>{project.name}</div>
                  <div style={{ fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase',color:'#c4a882',marginTop:3 }}>{project.tag}</div>
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:'#c4a882',fontStyle:'italic' }}>{project.year}</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
