import { useEffect } from 'react'

// Bölümler arası smooth scroll + hafif fade overlay
export default function useScrollTransition() {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      html { scroll-behavior: smooth; }

      /* Bölüm geçişi — her section scroll ile görününce */
      section, .team-section {
        position: relative;
      }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])
}
