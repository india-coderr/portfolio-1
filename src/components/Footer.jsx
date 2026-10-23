import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiArrowUp } from 'react-icons/fi'

const SOCIALS = [
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 border-t border-[rgba(255,255,255,0.04)]">
      <div className="section-container py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div>
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToTop() }}
              className="cursor-expand"
              data-cursor="expand"
            >
              <span
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span className="text-white">Virus</span>
                <span style={{ color: '#00FF88' }}>.co</span>
              </span>
            </a>
            <p className="text-xs text-[#555] mt-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Crafting digital experiences
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#888] hover:text-[#00FF88] hover:border-[#00FF88] transition-all duration-300"
                data-cursor="expand"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[#555] hover:text-[#00FF88] transition-colors"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
            data-cursor="expand"
          >
            Back to top
            <FiArrowUp size={14} />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.04)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#333]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            © {new Date().getFullYear()} Virus.co — All rights reserved.
          </p>
          <p className="text-xs text-[#333]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Designed & Developed with 💚
          </p>
        </div>
      </div>
    </footer>
  )
}
