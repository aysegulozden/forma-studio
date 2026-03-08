import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Cursor() {
  const { dark } = useTheme()
  const curRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafRef  = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (curRef.current) {
        curRef.current.style.left = e.clientX + 'px'
        curRef.current.style.top  = e.clientY + 'px'
      }
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const grow   = () => { curRef.current?.classList.add('big');    ringRef.current?.classList.add('big') }
    const shrink = () => { curRef.current?.classList.remove('big'); ringRef.current?.classList.remove('big') }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    const targets = document.querySelectorAll('a, button, .pc, .tc')
    targets.forEach((el) => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      targets.forEach((el) => { el.removeEventListener('mouseenter', grow); el.removeEventListener('mouseleave', shrink) })
    }
  }, [])

  return (
    <>
      <div
        ref={curRef}
        style={{
          position: 'fixed', width: 10, height: 10, background: '#b05a3a',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
          transform: 'translate(-50%,-50%)', transition: 'width .3s, height .3s',
          mixBlendMode: dark ? 'screen' : 'multiply',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', width: 36, height: 36, border: '1px solid #c4a882',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
          transform: 'translate(-50%,-50%)', transition: 'width .3s, height .3s',
        }}
      />
    </>
  )
}
