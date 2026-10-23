import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiStar } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    text: 'Exceptional developer who transformed our vision into reality. The attention to detail and creative solutions exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'CTO, InnovateLab',
    text: 'One of the most talented developers I have worked with. The code quality, performance optimization, and design sensibility are top-notch.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Product Manager, DigitalFlow',
    text: 'Delivered a stunning web application that boosted our conversions by 300%. The animations and user experience are simply world-class.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Founder, WebCraft',
    text: 'Professional, creative, and extremely reliable. The portfolio website created for us has been praised by clients and industry peers alike.',
    rating: 5,
  },
  {
    name: 'Lisa Park',
    role: 'Design Director, PixelPerfect',
    text: 'Amazing ability to translate complex designs into pixel-perfect, performant code. A true full-stack creative technologist.',
    rating: 5,
  },
  {
    name: 'David Martinez',
    role: 'VP Engineering, CloudScale',
    text: 'Built our entire SaaS dashboard from scratch. The architecture is clean, scalable, and the UI is incredibly polished.',
    rating: 5,
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-heading', {
        scrollTrigger: {
          trigger: '.testimonial-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const items = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section ref={sectionRef} id="testimonials" className="section-padding relative z-10">
      <div className="section-container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>06</span>
          <div className="w-12 h-[1px] bg-[rgba(255,255,255,0.1)]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Testimonials</span>
        </div>

        <h2 className="testimonial-heading section-title mb-4">
          What clients <span className="gradient-text">say</span>
        </h2>
        <p className="testimonial-heading section-subtitle max-w-xl mb-16">
          Trusted by founders, designers, and engineering leaders worldwide.
        </p>
      </div>

      {/* Slider */}
      <div className="overflow-hidden">
        <div className="testimonial-track">
          {items.map((t, i) => (
            <div
              key={i}
              className="glass-card p-6 md:p-8 min-w-[320px] md:min-w-[400px] shrink-0 group hover:border-[rgba(0,255,136,0.12)] transition-all duration-500"
              data-cursor="expand"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <FiStar key={j} size={14} className="text-[#00FF88] fill-[#00FF88]" />
                ))}
              </div>

              <p className="text-sm text-[#888] leading-relaxed mb-6 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FF88] to-[#8B5CF6] flex items-center justify-center text-[#050505] font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {t.name}
                  </p>
                  <p className="text-xs text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-container">
        <div className="section-divider mt-20" />
      </div>
    </section>
  )
}
