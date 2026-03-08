import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useMediaQuery'
import SectionLabel from '../components/SectionLabel'
import { TEAM, VALUES } from '../data'

export default function About() {
  const { colors } = useTheme()
  const isMobile = useIsMobile()
  const [aboutRef, aboutInView] = useInView(0.1)
  const [teamRef, teamInView] = useInView(0.1)

  return (
    <>
      <section id="hakkimizda" ref={aboutRef} style={{
        padding: isMobile ? '80px 24px' : '120px 56px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 48 : 90,
        alignItems: 'center',
        background: colors.cream, overflow: 'hidden',
      }}>

        {/* Görsel — mobilde üstte */}
        <div style={{ position: 'relative' }}>
          <div style={{ overflow: 'hidden', borderRadius: isMobile ? '120px 120px 0 0' : '200px 200px 0 0' }}>
            <div style={{
              width: '100%', aspectRatio: isMobile ? '4/3' : '3/4',
              background: 'linear-gradient(160deg,#b8a888,#8a7058,#5e4838)',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 32,
              transform: aboutInView ? 'translateY(0)' : 'translateY(60px)',
              opacity: aboutInView ? 1 : 0,
              transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s, opacity 1s ease 0.2s',
            }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMobile ? 32 : 48, fontStyle:'italic', color:'rgba(255,255,255,0.1)' }}>forma</span>
            </div>
          </div>

          {/* Accent daire — sadece desktop */}
          {!isMobile && (
            <div style={{
              position: 'absolute', bottom: -32, right: -32, width: '50%', aspectRatio: '1',
              borderRadius: '50%', border: `5px solid ${colors.cream}`, overflow: 'hidden',
              background: 'linear-gradient(135deg,#d4b898,#9a7858)',
              transform: aboutInView ? 'scale(1)' : 'scale(0)',
              transition: 'transform 1s cubic-bezier(0.34,1.56,0.64,1) 0.6s',
            }} />
          )}

          {/* Malzeme swatchları */}
          <div style={{
            display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap',
            justifyContent: isMobile ? 'flex-start' : 'flex-start',
          }}>
            {[['#c9b49a','Ahşap'],['#8a7058','Taş'],['#b05a3a','Toprak'],['#8a9e84','Yeşil']].map(([c,l], i) => (
              <div key={l} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                opacity: aboutInView ? 1 : 0,
                transform: aboutInView ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.6s ease ${0.4 + i * 0.1}s, transform 0.6s ease ${0.4 + i * 0.1}s`,
              }}>
                <div style={{ width: 24, height: 24, borderRadius: 2, background: c, flexShrink: 0 }} />
                <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a9e84' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* İçerik */}
        <div>
          <SectionLabel>Kimiz</SectionLabel>

          <h2 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize: isMobile ? '32px' : 'clamp(34px,3.5vw,52px)',
            fontWeight:300, color:colors.soil, marginBottom:24, lineHeight:1.1,
            opacity: aboutInView ? 1 : 0,
            transform: aboutInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
          }}>
            Detayda <em style={{ fontStyle:'italic',color:'#b05a3a' }}>anlam</em>,<br />mekanda denge.
          </h2>

          {['2010\'dan bu yana İstanbul merkezli çalışıyoruz. Konut, ticari ve otelcilik projelerinde her adımı titizlikle yönetiyoruz.',
            'Sürdürülebilirlik temel ilkemiz. Yerel zanaatkarlıkla küresel estetik arasında köprü kuruyoruz.'
          ].map((text, i) => (
            <p key={i} style={{
              fontSize: isMobile ? 14 : 15, lineHeight:1.9, color:colors.bark, marginBottom:16,
              opacity: aboutInView ? 1 : 0,
              transform: aboutInView ? 'translateX(0)' : 'translateX(20px)',
              transition: `opacity 0.8s ease ${0.45 + i * 0.12}s, transform 0.8s ease ${0.45 + i * 0.12}s`,
            }}>{text}</p>
          ))}

          {/* Değerler */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28 }}>
            {VALUES.map(({ icon, title, desc }, i) => (
              <div key={title} style={{
                padding: isMobile ? 14 : 18,
                border: `1px solid ${colors.border}`, borderRadius: 4, background: colors.bg2,
                opacity: aboutInView ? 1 : 0,
                transform: aboutInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.7s ease ${0.6 + i * 0.1}s, transform 0.7s ease ${0.6 + i * 0.1}s`,
              }}>
                <div style={{ fontSize:18, marginBottom:6 }}>{icon}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMobile ? 14 : 16, fontWeight:600, color:colors.soil, marginBottom:4 }}>{title}</div>
                <div style={{ fontSize:11, color:colors.bark, lineHeight:1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ekip */}
      <div ref={teamRef} style={{ padding: isMobile ? '80px 24px' : '100px 56px', background: colors.bg3, overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
          <div style={{
            fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'#8a9e84',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:16,
            opacity: teamInView ? 1 : 0, transition: 'opacity 0.7s ease 0.1s',
          }}>
            <span style={{ width: teamInView ? 24 : 0, height:1, background:'#8a9e84', transition:'width 0.6s ease 0.3s', display:'block' }} />
            Ekibimiz
            <span style={{ width: teamInView ? 24 : 0, height:1, background:'#8a9e84', transition:'width 0.6s ease 0.3s', display:'block' }} />
          </div>
          <h2 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize: isMobile ? '30px' : 'clamp(32px,3.5vw,50px)',
            fontWeight:300, color:colors.soil,
            opacity: teamInView ? 1 : 0,
            transform: teamInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          }}>
            Arkamızdaki <em style={{ fontStyle:'italic',color:'#b05a3a' }}>eller</em>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: isMobile ? 40 : 28,
        }}>
          {TEAM.map((member, i) => (
            <div key={member.name} style={{
              textAlign: 'center',
              opacity: teamInView ? 1 : 0,
              transform: teamInView ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 0.8s ease ${0.2 + i * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s`,
            }}>
              <div style={{ overflow: 'hidden', borderRadius: isMobile ? '80px 80px 0 0' : '120px 120px 0 0', marginBottom: 16, maxWidth: isMobile ? 220 : '100%', margin: '0 auto 16px' }}>
                <div style={{
                  width:'100%', aspectRatio:'3/4', background:member.gradient,
                  transform: teamInView ? 'scale(1)' : 'scale(1.1)',
                  transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s`,
                }} />
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMobile ? 20 : 22, color:colors.soil }}>{member.name}</div>
              <div style={{ fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:'#c4a882',margin:'6px 0 10px' }}>{member.role}</div>
              <p style={{ fontSize:13,color:colors.bark,lineHeight:1.7,maxWidth:240,margin:'0 auto' }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
