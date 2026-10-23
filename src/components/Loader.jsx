import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const BRAND = 'VIRUS.CO'
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [displayText, setDisplayText] = useState(BRAND.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''))
  const [revealed, setRevealed] = useState(0)
  const intervalRef = useRef(null)

  // Scramble effect
  useEffect(() => {
    let iteration = 0
    intervalRef.current = setInterval(() => {
      const revealedCount = Math.floor(iteration / 3)
      setRevealed(revealedCount)
      
      const text = BRAND.split('').map((char, i) => {
        if (i < revealedCount) return BRAND[i]
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')
      
      setDisplayText(text)
      
      if (revealedCount >= BRAND.length) {
        setDisplayText(BRAND)
        clearInterval(intervalRef.current)
      }
      iteration++
    }, 50)

    return () => clearInterval(intervalRef.current)
  }, [])

  // Progress counter
  useEffect(() => {
    const duration = 2500
    const steps = 100
    const stepTime = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += 1
      setProgress(current)
      if (current >= 100) {
        clearInterval(timer)
        setTimeout(() => onComplete(), 400)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="loader-container"
      exit={{ 
        clipPath: 'circle(0% at 50% 50%)',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Brand text with scramble */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <h1
          className="font-bold tracking-tighter"
          style={{
            fontFamily: 'Mona Sans, sans-serif',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            letterSpacing: '-4px',
          }}
        >
          {displayText.split('').map((char, i) => (
            <span
              key={i}
              style={{
                color: i < revealed ? '#00FF88' : 'rgba(255,255,255,0.2)',
                textShadow: i < revealed ? '0 0 30px rgba(0,255,136,0.4)' : 'none',
                transition: 'color 0.3s, text-shadow 0.3s',
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-4 text-sm tracking-[0.3em] uppercase"
          style={{ fontFamily: 'JetBrains Mono, monospace', color: '#555' }}
        >
          Tech With Me
        </motion.p>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[200px]">
        <div className="flex justify-between mb-2">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#555' }}
          >
            aao chale
          </span>
          <span
            className="text-xs"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00FF88' }}
          >
            {progress}%
          </span>
        </div>
        <div className="w-full h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00FF88, #8B5CF6)' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-xs tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#333' }}>
        [ 01 ]
      </div>
      <div className="absolute top-8 right-8 text-xs tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#333' }}>
        PORTFOLIO — 2026
      </div>
      <div className="absolute bottom-8 left-8 text-xs tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#333' }}>
        AI AUTOMATIONS & WEB DEVELOPMENT
      </div>
      <div className="absolute bottom-8 right-8 text-xs tracking-widest" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#333' }}>
        VIRUS.CO
      </div>
    </motion.div>
  )
}
