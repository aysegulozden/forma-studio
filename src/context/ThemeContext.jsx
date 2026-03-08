import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)

  const colors = {
    cream:        dark ? '#1a1510' : '#faf6ef',
    soil:         dark ? '#f0e8da' : '#3a2e24',
    bark:         dark ? '#c4b09a' : '#6b5040',
    bg2:          dark ? '#221c15' : '#f4ede0',
    bg3:          dark ? '#130f0a' : '#e8dcc8',
    bgContact:    dark ? '#0e0b07' : '#3a2e24',
    bgFooter:     dark ? '#080604' : '#2a2018',
    navBg:        dark ? 'rgba(26,21,16,0.95)' : 'rgba(250,246,239,0.95)',
    border:       dark ? 'rgba(196,168,130,0.15)' : 'rgba(107,80,64,0.15)',
    contactTitle: dark ? '#f0e0c8' : '#f4ede0',
  }

  return (
    <ThemeContext.Provider value={{ dark, setDark, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}
