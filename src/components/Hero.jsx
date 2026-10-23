import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import heroImage from '../assets/images/hero-portrait.png'

const TITLES = [
  'Full Stack Developer',
  'Creative Technologist',
  'Python Specialist',
  'Freelance Developer',
]

export default function Hero() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const imageRef = useRef(null)
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const mousePos = useRef({ x: 0, y: 0 })

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Stagger letters
      tl.from('.hero-letter', {
        y: 120,
        opacity: 0,
        rotateX: -80,
        stagger: 0.04,
        duration: 1,
        ease: 'power4.out',
      })
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4')
      .from('.hero-image-wrapper', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.6')
      .from('.hero-cta', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .from('.hero-badge', {
        scale: 0,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'back.out(2)',
      }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Typing animation
  useEffect(() => {
    const currentTitle = TITLES[titleIndex]
    let charIndex = 0
    let timeout

    if (isTyping) {
      timeout = setInterval(() => {
        setDisplayedTitle(currentTitle.slice(0, charIndex + 1))
        charIndex++
        if (charIndex >= currentTitle.length) {
          clearInterval(timeout)
          setTimeout(() => setIsTyping(false), 2000)
        }
      }, 80)
    } else {
      timeout = setInterval(() => {
        setDisplayedTitle(currentTitle.slice(0, charIndex))
        charIndex--
        if (charIndex < 0) {
          clearInterval(timeout)
          setTitleIndex((prev) => (prev + 1) % TITLES.length)
          setIsTyping(true)
        }
      }, 40)
      charIndex = currentTitle.length
    }

    return () => clearInterval(timeout)
  }, [titleIndex, isTyping])

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: mousePos.current.x * 20,
          y: mousePos.current.y * 15,
          duration: 0.8,
          ease: 'power2.out',
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const brandLetters = 'VIRUS.CO'.split('')

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '100px', paddingBottom: '60px' }}
    >
      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Text */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-[rgba(255,255,255,0.06)]" style={{ background: 'rgba(0,255,136,0.05)' }}>
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="text-xs tracking-widest uppercase text-[#888]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Available for work
              </span>
            </motion.div>

            {/* Main title */}
            <h1 ref={titleRef} className="hero-title mb-6" style={{ perspective: '800px' }}>
              {brandLetters.map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block"
                  style={{
                    color: letter === '.' ? '#00FF88' : '#fff',
                    textShadow: letter === '.' ? '0 0 30px rgba(0,255,136,0.4)' : 'none',
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>

            {/* Typing subtitle */}
            <div className="hero-subtitle mb-4">
              <p
                className="text-lg md:text-2xl font-light"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#888' }}
              >
                Creative{' '}
                <span className="text-[#00FF88]" style={{ textShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
                  {displayedTitle}
                </span>
                <span className="animate-pulse text-[#00FF88]">|</span>
              </p>
            </div>

            {/* Description */}
            <p className="hero-subtitle section-subtitle max-w-lg mb-10">
              Building the future of the web, one pixel at a time. Ai automation and web development.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('#projects')}
                className="hero-cta magnetic-btn-filled magnetic-btn"
                data-cursor="expand"
              >
                View Projects
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="hero-cta magnetic-btn"
                data-cursor="expand"
              >
                Contact Me
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-12">
              {[
                { value: '50+', label: 'Projects' },
                { value: '3+', label: 'Years Exp' },
                { value: '30+', label: 'Clients' },
              ].map((stat, i) => (
                <div key={i} className="hero-badge">
                  <p className="text-2xl md:text-3xl font-bold text-[#00FF88]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#555] tracking-widest uppercase mt-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="hero-image-wrapper relative">
              {/* Glow behind image */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,136,0.15), rgba(139,92,246,0.15))',
                  filter: 'blur(60px)',
                  transform: 'scale(0.9)',
                }}
              />
              {/* Image container */}
              <div
                ref={imageRef}
                className="relative w-[280px] h-[350px] md:w-[380px] md:h-[480px] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]"
                style={{ willChange: 'transform' }}
              >
                <img
                  src={heroImage}
                  alt="Virus.co Portrait"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Green overlay tint */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 50%, rgba(0,255,136,0.08) 100%)',
                  }}
                />
              </div>
              {/* Floating label */}
              <div
                className="hero-badge absolute -bottom-4 -left-4 md:-left-8 glass-card px-4 py-2"
                style={{ borderColor: 'rgba(0,255,136,0.15)' }}
              >
                <span className="text-xs tracking-widest text-[#00FF88]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {'< DEVELOPER />'}
                </span>
              </div>
              {/* Status dot */}
              <div
                className="hero-badge absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}
              >
                <span className="w-3 h-3 rounded-full bg-[#00FF88] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>SCROLL</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#00FF88] to-transparent" />
      </motion.div>
    </section>
  )
}
