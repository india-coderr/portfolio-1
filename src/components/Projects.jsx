import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

import projectEcommerce from '../assets/images/project-ecommerce.png'
import projectSaas from '../assets/images/project-saas.png'
import projectSocial from '../assets/images/project-social.png'
import projectAi from '../assets/images/project-ai.png'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'NexShop Pro',
    category: 'E-Commerce Platform',
    description: 'A premium full-stack e-commerce platform with real-time inventory, AI-powered recommendations, and seamless payment integration.',
    image: projectEcommerce,
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    github: '#',
    live: '#',
  },
  {
    title: 'DataVault Analytics',
    category: 'SaaS Dashboard',
    description: 'Enterprise-grade analytics dashboard with real-time data visualization, custom reporting, and team collaboration features.',
    image: projectSaas,
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'D3.js', 'AWS'],
    github: '#',
    live: '#',
  },
  {
    title: 'ConnectSphere',
    category: 'Social Platform',
    description: 'Modern social networking platform with real-time messaging, stories, and AI-powered content moderation.',
    image: projectSocial,
    tech: ['React', 'Socket.io', 'Express', 'MongoDB', 'WebRTC'],
    github: '#',
    live: '#',
  },
  {
    title: 'NeuroLens AI',
    category: 'AI Application',
    description: 'Intelligent computer vision platform leveraging deep learning for real-time image analysis and natural language processing.',
    image: projectAi,
    tech: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Docker'],
    github: '#',
    live: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative z-10">
      <div className="section-container">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>03</span>
          <div className="w-12 h-[1px] bg-[rgba(255,255,255,0.1)]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#555]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Work</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="section-title mb-4">
              Selected <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle max-w-xl">
              A curated collection of projects that showcase my expertise in building
              modern, performant web applications.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project, i) => (
            <Tilt
              key={project.title}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              scale={1.01}
              transitionSpeed={400}
              className="project-card"
            >
              <div
                className="glass-card overflow-hidden group hover:border-[rgba(0,255,136,0.12)] transition-all duration-500 gap-3"
                data-cursor="expand"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-[220px] md:h-[260px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                  {/* Light reflection */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, transparent 50%)',
                    }}
                  />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 text-xs rounded-full border border-[rgba(255,255,255,0.1)] text-[#888]"
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00FF88] transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#888] mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded border border-[rgba(255,255,255,0.06)] text-[#666]"
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-xs text-[#888] hover:text-[#00FF88] transition-colors"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      data-cursor="expand"
                    >
                      <FiGithub size={14} /> Code
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center gap-2 text-xs text-[#888] hover:text-[#00FF88] transition-colors"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      data-cursor="expand"
                    >
                      <FiExternalLink size={14} /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  )
}
