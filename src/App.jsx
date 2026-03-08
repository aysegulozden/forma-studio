import { useState } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import Hero from './pages/Hero'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'

function Layout() {
  const [page, setPage]                 = useState('home')
  const [activeProject, setActiveProject] = useState(null)
  const { colors } = useTheme()

  const goTo = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ background: colors.cream, color: colors.soil, minHeight: '100vh' }}>
      <Cursor />
      <Navbar page={page} setPage={goTo} />

      <PageTransition page={page}>
        {page === 'home' ? (
          <>
            <Hero />
            <Projects setPage={goTo} setActiveProject={setActiveProject} />
            <About />
            <Contact />
            <Footer />
          </>
        ) : (
          <>
            <ProjectDetail project={activeProject} setPage={goTo} />
            <Footer />
          </>
        )}
      </PageTransition>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}
