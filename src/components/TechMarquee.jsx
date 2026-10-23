import {
  FaReact, FaNodeJs, FaDocker, FaGithub, FaFigma, FaJs,
} from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss, SiMongodb } from 'react-icons/si'

const TECHS = [
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED' },
  { name: 'GitHub', icon: FaGithub, color: '#fff' },
  { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
  { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#fff' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
]

export default function TechMarquee() {
  const items = [...TECHS, ...TECHS, ...TECHS, ...TECHS]

  return (
    <section className="relative z-10 py-16 overflow-hidden border-y border-[rgba(255,255,255,0.04)]">
      <div className="marquee-container">
        <div className="marquee-track">
          {items.map((tech, i) => {
            const Icon = tech.icon
            return (
              <div
                key={i}
                className="flex items-center gap-3 shrink-0 group cursor-expand"
                data-cursor="expand"
              >
                <Icon
                  size={20}
                  style={{ color: tech.color, opacity: 0.5 }}
                  className="group-hover:opacity-100 transition-opacity"
                />
                <span
                  className="text-xl md:text-2xl font-bold text-[#333] group-hover:text-white transition-colors whitespace-nowrap"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {tech.name}
                </span>
                <span className="text-[#222] mx-4">•</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
