import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Loader from './components/Loader.jsx'
import CustomCursor from './components/Cursor.jsx'
import FloatingWords from './components/FloatingWords.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import TechMarquee from './components/TechMarquee.jsx'
import Projects from './components/Projects.jsx'
import FeaturedProject from './components/FeaturedProject.jsx'
import Services from './components/Services.jsx'
import Experience from './components/Experience.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Background from './components/Background.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!loading) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      return () => lenis.destroy()
    }
  }, [loading])

  const handleLoadComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          {!isMobile && <CustomCursor />}
          {!isMobile && <FloatingWords />}
          <div className="noise-overlay" />
          <Background />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <TechMarquee />
            <Projects />
            <FeaturedProject />
            <Services />
            <Experience />
            <Testimonials />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
