export default function SectionLabel({ children, light = false }) {
  return (
    <div style={{
      fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
      color: light ? '#c4a882' : '#8a9e84',
      display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24,
    }}>
      <span style={{ width: 24, height: 1, background: light ? '#c4a882' : '#8a9e84', display: 'block' }} />
      {children}
    </div>
  )
}
