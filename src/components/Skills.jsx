import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaGitAlt, FaGithub, FaDocker, FaFigma,
} from 'react-icons/fa'
import {
  SiNextdotjs, SiExpress, SiMongodb, SiTailwindcss,
  SiFirebase, SiFramer, SiGreensock, SiThreedotjs,
} from 'react-icons/si'
import { TbApi, TbBrain } from 'react-icons/tb'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  // { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'Express', icon: SiExpress, color: '#ffffff' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'Git', icon: FaGitAlt, color: '#F05032' },
  { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
  { name: 'GSAP', icon: SiGreensock, color: '#88CE02' },
  // { name: 'Three.js', icon: SiThreedotjs, color: '#ffffff' },
  // { name: 'REST APIs', icon: TbApi, color: '#00FF88' },
  { name: 'AI Integration', icon: TbBrain, color: '#8B5CF6' },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        scale: 0.9,
        stagger: 0.04,
        duration: 0.6,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="section-padding relative z-10">
      <div className="section-container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>02</span>
          <div className="w-12 h-[1px] bg-[rgba(255,255,255,0.1)]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Skills</span>
        </div>

        <h2 className="section-title mb-4">
          Technologies I <span className="gradient-text">master</span>
        </h2>
        <p className="section-subtitle max-w-xl mb-16">
          A comprehensive toolkit of modern technologies that power premium digital experiences.
        </p>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon
            return (
              <Tilt
                key={skill.name}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.02}
                transitionSpeed={300}
                className="skill-card"
              >
                <motion.div
                  className="glass-card p-5 flex flex-col items-center gap-3 group hover:border-[rgba(0,255,136,0.15)] transition-all duration-500 cursor-expand"
                  data-cursor="expand"
                  whileHover={{
                    boxShadow: `0 0 20px ${skill.color}15, 0 0 60px ${skill.color}08`,
                  }}
                >
                  <Icon
                    size={28}
                    style={{ color: skill.color }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <span
                    className="text-xs text-[#888] group-hover:text-white transition-colors text-center"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {skill.name}
                  </span>
                </motion.div>
              </Tilt>
            )
          })}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
