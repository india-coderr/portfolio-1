import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function AnimatedNumber({ end, suffix }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = 0
    const duration = 2500
    const stepTime = duration / end
    const timer = setInterval(() => {
      start += 1
      setValue(start)
      if (start >= end) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [end])
  return <>{value}{suffix}</>
}

const STATS = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 20, suffix: '+', label: 'Technologies' },
]

export default function About() {
  const sectionRef = useRef(null)
  const [counterRef, counterInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-heading', {
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section-padding relative z-10">
      <div className="section-container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            01
          </span>
          <div className="w-12 h-[1px] bg-[rgba(255,255,255,0.1)]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            About
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Heading */}
          <div>
            <h2 className="about-heading section-title mb-6">
              Building digital
              <br />
              <span className="gradient-text">experiences</span> that
              <br />
              matter.
            </h2>
            <div className="about-text w-16 h-[2px] bg-[#00FF88] mb-8" />
          </div>

          {/* Right - Content */}
          <div>
            <p className="about-text section-subtitle mb-6">
              I'm a creative full-stack developer with a passion for building
              beautiful, performant, and user-centric web applications. With
              expertise spanning from pixel-perfect frontends to robust backend
              architectures, I bridge the gap between design and engineering.
            </p>
            <p className="about-text section-subtitle mb-8">
              My approach combines clean code principles with creative
              problem-solving, ensuring every project delivers both aesthetic
              excellence and technical sophistication. I specialize in React
              ecosystems, modern animation frameworks, and AI-integrated
              applications.
            </p>

            {/* Tech badges */}
            <div className="about-text flex flex-wrap gap-2 mb-10">
              {['React', 'Node.js', 'Three.js', 'GSAP', 'Next.js', 'AI/ML'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full border border-[rgba(255,255,255,0.06)] text-[#888]"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Counter */}
        <div ref={counterRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 text-center group hover:border-[rgba(0,255,136,0.15)] transition-all duration-500"
            >
              <p className="text-3xl md:text-4xl font-bold text-[#00FF88] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {counterInView ? (
                  <AnimatedNumber end={stat.value} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </p>
              <p className="text-xs text-[#555] tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
