import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiArrowRight } from 'react-icons/hi'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        scrollTrigger: {
          trigger: '.contact-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: '.contact-form',
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    // EmailJS integration placeholder
    // To enable, replace with your own EmailJS credentials:
    // import emailjs from 'emailjs-com'
    // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY')

    // Simulated send
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative z-10">
      <div className="section-container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>08</span>
          <div className="w-12 h-[1px] bg-[rgba(255,255,255,0.1)]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Heading */}
          <div>
            <h2
              className="contact-heading font-bold text-white mb-6"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: '1',
                letterSpacing: '-3px',
              }}
            >
              Let's Build
              <br />
              Something
              <br />
              <span className="gradient-text">Amazing</span>
            </h2>
            <p className="contact-heading section-subtitle max-w-md mb-8">
              Have a project in mind? Let's discuss how we can create something
              extraordinary together.
            </p>

            {/* Contact info */}
            <div className="contact-heading space-y-4">
              <a
                href="mailto:hello@virus.co"
                className="flex items-center gap-3 text-[#888] hover:text-[#00FF88] transition-colors group"
                data-cursor="expand"
              >
                <span className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center group-hover:border-[#00FF88] transition-colors">
                  <span className="text-xs">@</span>
                </span>
                <span className="text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  aadarsh45india@gmail.com
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-[#888] hover:text-[#00FF88] transition-colors group"
                data-cursor="expand"
              >
                <span className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center group-hover:border-[#00FF88] transition-colors">
                  <span className="text-xs">📍</span>
                </span>
                <span className="text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  India — Available Worldwide
                </span>
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-form">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-xs tracking-widest uppercase text-[#555] mb-2 block"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-[rgba(255,255,255,0.06)] text-white placeholder-[#333] focus:outline-none focus:border-[#00FF88] transition-colors text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-xs tracking-widest uppercase text-[#555] mb-2 block"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-[rgba(255,255,255,0.06)] text-white placeholder-[#333] focus:outline-none focus:border-[#00FF88] transition-colors text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-xs tracking-widest uppercase text-[#555] mb-2 block"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-[rgba(255,255,255,0.06)] text-white placeholder-[#333] focus:outline-none focus:border-[#00FF88] transition-colors text-sm resize-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                className="magnetic-btn-filled magnetic-btn w-full md:w-auto"
                data-cursor="expand"
                whileTap={{ scale: 0.98 }}
              >
                {sent ? (
                  <>
                    <span className="text-[#050505]">✓ Message Sent!</span>
                  </>
                ) : sending ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >
                      ◌
                    </motion.span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <HiArrowRight />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
