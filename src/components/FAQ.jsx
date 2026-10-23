import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiPlus, HiMinus } from 'react-icons/hi'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in React, Next.js, Node.js, and modern JavaScript ecosystems. I also work with Three.js for 3D experiences, GSAP/Framer Motion for animations, and various databases including MongoDB and PostgreSQL.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. A landing page typically takes 1-2 weeks, while a full web application can take 4-8 weeks. I always provide detailed timelines during our initial consultation.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Absolutely! I work with clients globally and am experienced in async communication across time zones. I use tools like Slack, Notion, and Loom to keep projects on track.',
  },
  {
    question: 'What is your development process?',
    answer: 'My process follows: Discovery → Design → Development → Testing → Deployment → Support. I keep you involved at every stage with regular updates, demos, and feedback sessions.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer: 'Yes, I offer maintenance and support packages for all projects. This includes bug fixes, performance monitoring, security updates, and feature enhancements as your business grows.',
  },
  {
    question: 'How do you handle project pricing?',
    answer: 'I offer both fixed-price and hourly engagement models. For most projects, I provide a detailed quote after understanding your requirements. All pricing is transparent with no hidden costs.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
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
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>07</span>
          <div className="w-12 h-[1px] bg-[rgba(255,255,255,0.1)]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>FAQ</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <h2 className="section-title mb-4">
              Frequently <span className="gradient-text">Asked</span>
              <br />Questions
            </h2>
            <p className="section-subtitle max-w-md">
              Got questions? Here are some common ones. Feel free to reach out if you
              need more details.
            </p>
          </div>

          {/* Right - Accordion */}
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="faq-item border-b border-[rgba(255,255,255,0.04)]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                  data-cursor="expand"
                >
                  <span
                    className={`text-sm md:text-base font-medium transition-colors ${
                      openIndex === i ? 'text-[#00FF88]' : 'text-[#888] group-hover:text-white'
                    }`}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {faq.question}
                  </span>
                  <span className="ml-4 shrink-0 text-[#555]">
                    {openIndex === i ? <HiMinus size={18} /> : <HiPlus size={18} />}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm text-[#666] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
