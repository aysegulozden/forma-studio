import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useIsMobile } from '../hooks/useMediaQuery'
import HeroCanvas from '../components/HeroCanvas'

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

export default function Hero() {
  const { colors } = useTheme()
  const isMobile = useIsMobile()
  const [heroRef, heroInView] = useInView(0.1)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const fadeOut = Math.max(0, 1 - scrollY / 500)
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={heroRef} style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      background: colors.cream, opacity: fadeOut,
      display: 'flex', alignItems: isMobile ? 'flex-end' : 'flex-end',
    }}>
      <HeroCanvas />

      {/* İçerik */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: isMobile ? '0 24px 60px' : '0 56px 80px',
        maxWidth: isMobile ? '100%' : 680,
        width: isMobile ? '100%' : 'auto',
      }}>

        {/* Eyebrow */}
        <div style={{
          fontSize: isMobile ? 9 : 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: '#8a9e84', marginBottom: isMobile ? 16 : 24,
          display: 'flex', alignItems: 'center', gap: 12,
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? 'translateX(0)' : 'translateX(-24px)',
          transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
        }}>
          <span style={{ display: 'block', height: 1, background: '#8a9e84', width: heroInView ? 32 : 0, transition: 'width 0.8s ease 0.4s', flexShrink: 0 }} />
          İç Mimarlık Stüdyosu — İstanbul
        </div>

        {/* Başlık */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, lineHeight: 1.05,
          color: colors.soil, marginBottom: isMobile ? 16 : 28,
          fontSize: isMobile ? '42px' : 'clamp(44px,5.5vw,72px)',
        }}>
          {[
            { text: 'Yaşayan', delay: '0.3s' },
            { text: 'mekanlar', delay: '0.45s' },
            { text: 'tasarlıyoruz.', delay: '0.6s', em: true },
          ].map(({ text, delay, em }) => (
            <div key={text} style={{ overflow: 'hidden', display: 'block' }}>
              <span style={{
                display: 'inline-block',
                fontStyle: em ? 'italic' : 'normal',
                color: em ? '#b05a3a' : 'inherit',
                transform: heroInView ? 'translateY(0)' : 'translateY(110%)',
                transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}`,
              }}>{text}</span>
            </div>
          ))}
        </h1>

        {/* Açıklama */}
        <p style={{
          fontSize: isMobile ? 14 : 16, lineHeight: 1.85, color: colors.bark,
          maxWidth: isMobile ? '100%' : 520, marginBottom: isMobile ? 20 : 20,
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.9s ease 0.8s, transform 0.9s ease 0.8s',
        }}>
          {isMobile
            ? 'Doğal malzemeler, dengeli ışık ve insan ölçeğinde tasarım — her mekanda.'
            : 'Forma Studio\'da her projeyi, müşterimizin yaşam biçimini ve değerlerini yansıtan özgün bir hikaye olarak ele alıyoruz. Doğal malzemeler, dengeli ışık ve insan ölçeğinde tasarım — her mekanda.'}
        </p>

        {/* İstatistikler */}
        <div style={{
          display: 'flex', gap: isMobile ? 28 : 48, marginBottom: isMobile ? 32 : 44,
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s ease 1s, transform 0.8s ease 1s',
        }}>
          {[['14+', 'Yıl'], ['230', 'Proje'], ['3', 'Ödül']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? 32 : 40, fontWeight: 300, color: colors.soil, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c4a882', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={() => scrollTo('projeler')} style={{
          display: 'inline-flex', alignItems: 'center', gap: 14, fontSize: 11,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: colors.soil,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontFamily: "'Outfit',sans-serif",
          opacity: heroInView ? 1 : 0,
          transition: 'opacity 0.8s ease 1.1s',
        }}>
          <span style={{ display: 'block', height: 1, background: '#b05a3a', width: heroInView ? 40 : 0, transition: 'width 0.6s ease 1.3s' }} />
          Projeleri Keşfet
        </button>
      </div>

      {/* Scroll göstergesi — sadece desktop */}
      {!isMobile && (
        <div style={{
          position: 'absolute', bottom: 40, right: 56,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 3,
          opacity: heroInView ? 1 : 0, transition: 'opacity 1s ease 1.5s',
        }}>
          <div style={{ width: 1, height: 56, background: 'linear-gradient(to bottom,#c4a882,transparent)', animation: 'sp 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.bark, writingMode: 'vertical-rl' }}>Kaydır</span>
        </div>
      )}

      <style>{`@keyframes sp { 0%,100%{opacity:.4;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.2)} }`}</style>
    </section>
  )
}
