import { useState, useEffect, useRef } from 'react'

// Her sayfa değişiminde: önce mevcut sayfa sola kayar/solar,
// sonra yeni sayfa sağdan girer.
export default function PageTransition({ page, children }) {
  const [displayed, setDisplayed]   = useState(children)
  const [animState, setAnimState]   = useState('idle') // idle | exit | enter
  const prevPage  = useRef(page)
  const timer     = useRef(null)

  useEffect(() => {
    if (page === prevPage.current) return
    prevPage.current = page

    // 1. Çıkış animasyonu başlat
    setAnimState('exit')

    timer.current = setTimeout(() => {
      // 2. İçeriği değiştir
      setDisplayed(children)
      setAnimState('enter')

      timer.current = setTimeout(() => {
        // 3. Giriş tamamlandı
        setAnimState('idle')
      }, 600)
    }, 420)

    return () => clearTimeout(timer.current)
  }, [page]) // eslint-disable-line

  // children değişince (aynı page) displayed güncelle
  useEffect(() => {
    if (animState === 'idle') setDisplayed(children)
  }, [children]) // eslint-disable-line

  const style = {
    exit: {
      opacity: 0,
      transform: 'translateY(18px)',
      transition: 'opacity 0.38s ease, transform 0.38s ease',
      pointerEvents: 'none',
    },
    enter: {
      opacity: 0,
      transform: 'translateY(-14px)',
      transition: 'none',
    },
    idle: {
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)',
    },
  }

  // enter → idle tetikle (bir frame sonra)
  const divRef = useRef(null)
  useEffect(() => {
    if (animState === 'enter') {
      const id = requestAnimationFrame(() => setAnimState('idle'))
      return () => cancelAnimationFrame(id)
    }
  }, [animState])

  return (
    <div ref={divRef} style={{ ...style[animState] || style.idle }}>
      {displayed}
    </div>
  )
}
