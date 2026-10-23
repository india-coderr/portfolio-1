import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    title: 'Web Development',
    description: 'Full-stack applications with modern frameworks and best practices.',
    num: '01',
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive, beautiful interfaces that delight users.',
    num: '02',
  },
  {
    title: 'Brand Identity',
    description: 'Cohesive visual identities that tell your brand story.',
    num: '03',
  },
  {
    title: 'Animations & Motion',
    description: 'Premium micro-interactions and cinematic transitions.',
    num: '04',
  },
  {
    title: 'Full Stack Solutions',
    description: 'End-to-end development from database to deployment.',
    num: '05',
  },
  {
    title: 'AI Applications',
    description: 'Intelligent solutions powered by machine learning.',
    num: '06',
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-item-el', {
        scrollTrigger: {
          trigger: '.services-list',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding relative z-10">
      <div className="section-container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>04</span>
          <div className="w-12 h-[1px] bg-[rgba(255,255,255,0.1)]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Services</span>
        </div>

        <h2 className="section-title mb-4">
          What I <span className="gradient-text">do</span>
        </h2>
        <p className="section-subtitle max-w-xl mb-16">
          Specialized services tailored to bring your digital vision to life.
        </p>

        {/* Services list */}
        <div className="services-list">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.num}
              className="service-item-el py-8 border-b border-[rgba(255,255,255,0.04)] flex items-center justify-between group cursor-expand"
              data-cursor="expand"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span
                  className="text-xs text-[#333] group-hover:text-[#00FF88] transition-colors"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {service.num}
                </span>
                <div>
                  <h3
                    className="text-xl md:text-3xl lg:text-4xl font-bold text-[#444] group-hover:text-white transition-colors"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-1px' }}
                  >
                    {service.title}
                  </h3>
                  <motion.p
                    className="text-sm text-[#555] mt-1 max-w-md overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: hoveredIndex === i ? 'auto' : 0, opacity: hoveredIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.description}
                  </motion.p>
                </div>
              </div>
              <HiArrowRight
                className="text-[#333] group-hover:text-[#00FF88] transition-all group-hover:translate-x-2"
                size={24}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
