import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useMediaQuery'
import { useFormValidation } from '../hooks/useFormValidation'
import SectionLabel from '../components/SectionLabel'
import Dropdown from '../components/Dropdown'
import { CONTACT_INFO } from '../data'

const PROJECT_TYPES = ['Konut Tasarımı','Ticari Alan','Otel / Butik','Renovasyon','Danışmanlık']
const BUDGETS = ['500.000 ₺ altı','500.000 – 1.500.000 ₺','1.500.000 – 5.000.000 ₺','5.000.000 ₺ üstü']

export default function Contact() {
  const { colors } = useTheme()
  const isMobile = useIsMobile()
  const { form, errors, submitted, loading, setField, setForm, submit } = useFormValidation()
  const [ref, inView] = useInView(0.08)

  const setDropdown = (key) => (value) => setForm(f => ({ ...f, [key]: value }))

  const inp = (hasErr) => ({
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${hasErr ? '#b05040' : 'rgba(196,168,130,0.2)'}`,
    borderRadius: 3, padding: '12px 15px',
    fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:300,
    color:'#e8dcc8', outline:'none', width:'100%',
    boxSizing: 'border-box',
  })

  return (
    <section id="iletisim" ref={ref} style={{
      padding: isMobile ? '80px 24px' : '120px 56px',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? 48 : 80,
      background: colors.bgContact, overflow: 'hidden',
    }}>

      {/* Sol — bilgiler */}
      <div>
        <SectionLabel light>İletişim</SectionLabel>

        <h2 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize: isMobile ? '32px' : 'clamp(34px,3.5vw,52px)',
          fontWeight:300, color:colors.contactTitle, marginBottom:16, lineHeight:1.1,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
        }}>
          Projenizi<br /><em style={{ fontStyle:'italic',color:'#c4a882' }}>konuşalım.</em>
        </h2>

        <p style={{
          fontSize: isMobile ? 14 : 15, lineHeight:1.9, color:'#c4a882', marginBottom:36,
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease 0.35s',
        }}>
          Yeni bir proje mi düşünüyorsunuz? Bir fikir taslağı ya da henüz bir his — hepsiyle başlanır.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {CONTACT_INFO.map(({ label, value }, i) => (
            <div key={label} style={{
              display: 'flex', gap: 16, padding: '14px 0',
              borderBottom: '1px solid rgba(196,168,130,0.1)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-20px)',
              transition: `opacity 0.7s ease ${0.4 + i * 0.1}s, transform 0.7s ease ${0.4 + i * 0.1}s`,
            }}>
              <span style={{ fontSize:9,letterSpacing:'0.18em',textTransform:'uppercase',color:'#8a9e84',minWidth:70,paddingTop:4 }}>{label}</span>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: isMobile ? 16 : 18, color:'#e8dcc8' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ — form */}
      <div style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(40px)',
        transition: 'opacity 0.9s ease 0.4s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s',
      }}>
        {submitted ? (
          <div style={{ padding:'24px 28px', background:'rgba(138,158,132,0.12)', border:'1px solid rgba(138,158,132,0.3)', borderRadius:4, color:'#8a9e84', fontSize:15, lineHeight:1.9 }}>
            ✓ Mesajınız alındı.<br />En kısa sürede size döneceğiz.<br /><br />
            <span style={{ fontSize:12, opacity:0.7 }}>Forma Studio ekibi</span>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {/* Ad ve e-posta — mobilde alt alta */}
            <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:14 }}>
              <Field label="Ad Soyad *" error={errors.name}>
                <input style={inp(errors.name)} placeholder="Adınız" value={form.name} onChange={setField('name')} />
              </Field>
              <Field label="E-posta *" error={errors.email}>
                <input style={inp(errors.email)} type="email" placeholder="ornek@email.com" value={form.email} onChange={setField('email')} />
              </Field>
            </div>
            <Field label="Proje Türü *" error={errors.type}>
              <Dropdown value={form.type} onChange={v => setDropdown('type')(v)} options={PROJECT_TYPES} placeholder="Proje türü seçin..." error={errors.type} />
            </Field>
            <Field label="Bütçe Aralığı">
              <Dropdown value={form.budget} onChange={setDropdown('budget')} options={BUDGETS} placeholder="Bütçe aralığı seçin..." />
            </Field>
            <Field label="Mesajınız *" error={errors.message}>
              <textarea style={{ ...inp(errors.message), resize:'none', height:100 }} placeholder="Projenizi kısaca anlatın..." value={form.message} onChange={setField('message')} />
            </Field>
            <button onClick={submit} disabled={loading} style={{
              display:'inline-flex', alignItems:'center', justifyContent:'space-between',
              padding:'16px 24px', background:loading?'#7a3a24':'#b05a3a',
              color:'#faf6ef', border:'none', borderRadius:3,
              fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:500,
              letterSpacing:'0.18em', textTransform:'uppercase',
              cursor:'pointer', opacity:loading?0.7:1, width: isMobile ? '100%' : 'auto',
            }}>
              <span>{loading ? 'Gönderiliyor...' : 'Gönder'}</span>
              {!loading && <span style={{ fontSize:18 }}>→</span>}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function Field({ label, error, children }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <label style={{ fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',color:'#c4a882' }}>{label}</label>
      {children}
      {error && <span style={{ fontSize:11,color:'#e07060' }}>{error}</span>}
    </div>
  )
}
