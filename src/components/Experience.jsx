import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCE = [
  {
    role: 'Senior Full Stack Developer',
    company: 'TechCorp Innovation',
    period: '2023 — Present',
    description: 'Leading development of enterprise SaaS products. Building scalable architectures and mentoring junior developers.',
    tech: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
    side: 'left',
  },
  {
    role: 'Frontend Developer',
    company: 'Creative Agency',
    period: '2022 — 2023',
    description: 'Developed award-winning websites and web applications for global brands with a focus on animations and performance.',
    tech: ['React', 'GSAP', 'Three.js', 'Tailwind'],
    side: 'right',
  },
  {
    role: 'Full Stack Developer',
    company: 'StartupHub',
    period: '2021 — 2022',
    description: 'Built MVPs and production applications for multiple startups across fintech, healthtech, and e-commerce verticals.',
    tech: ['Next.js', 'MongoDB', 'Express', 'Firebase'],
    side: 'left',
  },
  {
    role: 'Junior Developer',
    company: 'Freelance',
    period: '2020 — 2021',
    description: 'Started journey as a freelance web developer, delivering custom solutions for small businesses and entrepreneurs.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    side: 'right',
  },
]

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Line grow animation
      gsap.from('.timeline-line-anim', {
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="section-padding relative z-10">
      <div className="section-container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>05</span>
          <div className="w-12 h-[1px] bg-[rgba(255,255,255,0.1)]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Journey</span>
        </div>

        <h2 className="section-title mb-4">
          My <span className="gradient-text">Experience</span>
        </h2>
        <p className="section-subtitle max-w-xl mb-16">
          A timeline of my professional journey through the tech industry.
        </p>

        {/* Timeline */}
        <div className="timeline-container relative">
          {/* Timeline line */}
          <div className="timeline-line-anim hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00FF88] via-[#8B5CF6] to-transparent -translate-x-1/2" />
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00FF88] via-[#8B5CF6] to-transparent" />

          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              className={`timeline-item relative flex flex-col md:flex-row items-start gap-6 mb-12 md:mb-16 ${
                exp.side === 'right' ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Dot */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#00FF88] bg-[#050505] z-10 items-center justify-center" style={{ top: '24px' }}>
                <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
              </div>
              <div className="md:hidden absolute left-5 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#00FF88] bg-[#050505] z-10" style={{ top: '8px' }} />

              {/* Card */}
              <div className={`ml-10 md:ml-0 md:w-[calc(50%-40px)] ${exp.side === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                <motion.div
                  className="glass-card p-6 hover:border-[rgba(0,255,136,0.12)] transition-all duration-500"
                  whileHover={{ y: -5 }}
                >
                  <span className="text-xs text-[#00FF88] tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {exp.period}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {exp.role}
                  </h3>
                  <p className="text-sm text-[#888] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {exp.company}
                  </p>
                  <p className="text-sm text-[#666] mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${exp.side === 'right' ? '' : 'md:justify-end'}`}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded border border-[rgba(255,255,255,0.06)] text-[#555]"
                        style={{ fontFamily: 'JetBrains Mono, monospace', background: 'rgba(255,255,255,0.02)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
