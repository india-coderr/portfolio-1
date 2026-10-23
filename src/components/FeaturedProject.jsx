import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import projectSaas from '../assets/images/project-saas.png'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProject() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image
      gsap.to('.featured-image', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -60,
        ease: 'none',
      })

      // Text reveal
      gsap.from('.featured-text', {
        scrollTrigger: {
          trigger: '.featured-text',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Mouse parallax for image
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 15
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      gsap.to(imageRef.current, { x, y, duration: 0.6, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={sectionRef} className="section-padding relative z-10">
      <div className="section-container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>★</span>
          <div className="w-12 h-[1px] bg-[rgba(255,255,255,0.1)]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Featured</span>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)]" style={{ background: 'rgba(17,17,17,0.4)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden h-[300px] lg:h-[500px]">
              <div
                ref={imageRef}
                className="featured-image absolute inset-0"
                style={{ willChange: 'transform' }}
              >
                <img
                  src={projectSaas}
                  alt="Featured Project"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111] opacity-60 lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent opacity-60 lg:hidden" />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span
                className="featured-text text-xs tracking-[0.3em] uppercase text-[#00FF88] mb-4"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                Featured Project
              </span>
              <h3
                className="featured-text text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-1px' }}
              >
                DataVault <span className="gradient-text">Analytics</span>
              </h3>
              <p className="featured-text text-[#888] mb-6 leading-relaxed">
                A comprehensive analytics platform that transforms complex data into
                actionable insights. Built with real-time processing, interactive
                dashboards, and enterprise-grade security for modern businesses.
              </p>

              {/* Features */}
              <div className="featured-text grid grid-cols-2 gap-3 mb-8">
                {['Real-time Data', 'Custom Reports', 'AI Insights', 'Team Collab'].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                    <span className="text-xs text-[#888]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Tech */}
              <div className="featured-text flex flex-wrap gap-2 mb-8">
                {['Next.js', 'TypeScript', 'PostgreSQL', 'D3.js', 'Redis', 'AWS'].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-[10px] rounded-full border border-[rgba(0,255,136,0.15)] text-[#00FF88]"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      background: 'rgba(0,255,136,0.05)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="featured-text flex gap-4">
                <a href="#" className="magnetic-btn-filled magnetic-btn text-xs" data-cursor="expand">
                  <FiExternalLink size={14} /> Live Demo
                </a>
                <a href="#" className="magnetic-btn text-xs" data-cursor="expand">
                  <FiGithub size={14} /> Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
