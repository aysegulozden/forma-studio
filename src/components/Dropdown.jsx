import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Dropdown({ value, onChange, options, placeholder = 'Seçiniz...', error }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { dark } = useTheme()

  // Dışarı tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selected = options.find((o) => o === value)

  const triggerStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${error ? '#b05040' : open ? '#c4a882' : 'rgba(196,168,130,0.2)'}`,
    borderRadius: open ? '3px 3px 0 0' : 3,
    padding: '12px 15px',
    fontFamily: "'Outfit',sans-serif",
    fontSize: 14,
    fontWeight: 300,
    color: selected ? '#e8dcc8' : 'rgba(196,168,130,0.4)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'border-color 0.2s',
    userSelect: 'none',
  }

  const menuStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: dark ? '#2a1f15' : '#3a2e24',
    border: '1px solid #c4a882',
    borderTop: 'none',
    borderRadius: '0 0 3px 3px',
    zIndex: 50,
    maxHeight: 220,
    overflowY: 'auto',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  }

  const optionStyle = (isSelected) => ({
    padding: '11px 15px',
    fontSize: 13,
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 300,
    color: isSelected ? '#f4ede0' : '#c4a882',
    background: isSelected ? 'rgba(176,90,58,0.3)' : 'transparent',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s',
    borderBottom: '1px solid rgba(196,168,130,0.08)',
  })

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
      <div style={triggerStyle} onClick={() => setOpen((o) => !o)}>
        <span>{selected || placeholder}</span>
        <span style={{
          fontSize: 10,
          color: '#c4a882',
          transition: 'transform 0.25s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>
          ▾
        </span>
      </div>

      {/* Menu */}
      {open && (
        <div style={menuStyle}>
          {options.map((option) => (
            <div
              key={option}
              style={optionStyle(option === value)}
              onClick={() => { onChange(option); setOpen(false) }}
              onMouseEnter={(e) => {
                if (option !== value) {
                  e.currentTarget.style.background = 'rgba(196,168,130,0.1)'
                  e.currentTarget.style.color = '#e8dcc8'
                }
              }}
              onMouseLeave={(e) => {
                if (option !== value) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#c4a882'
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
