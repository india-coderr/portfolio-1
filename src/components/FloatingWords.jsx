import { useEffect, useRef, useCallback } from 'react'

const WORDS = [
  'Creative', 'React', 'Developer', 'Frontend', 'Backend',
  'Animation', 'JavaScript', 'Performance', 'Innovation', 'Design',
  'Virus', 'Code', 'Modern', 'Responsive', 'AI',
  'Next Gen', 'Motion', 'UI', 'UX', 'Full Stack',
]

export default function FloatingWords() {
  const containerRef = useRef(null)
  const lastSpawn = useRef(0)
  const wordCount = useRef(0)

  const spawnWord = useCallback((x, y) => {
    const now = Date.now()
    if (now - lastSpawn.current < 300) return // throttle
    lastSpawn.current = now

    if (!containerRef.current) return
    if (wordCount.current >= 8) return // max concurrent words

    const word = WORDS[Math.floor(Math.random() * WORDS.length)]
    const el = document.createElement('span')
    el.className = 'floating-word'
    el.textContent = word

    // Random offset and direction
    const tx = (Math.random() - 0.5) * 100
    const ty = -(40 + Math.random() * 80)
    const tr = (Math.random() - 0.5) * 30

    el.style.left = `${x + (Math.random() - 0.5) * 20}px`
    el.style.top = `${y + (Math.random() - 0.5) * 20}px`
    el.style.setProperty('--tx', `${tx}px`)
    el.style.setProperty('--ty', `${ty}px`)
    el.style.setProperty('--tr', `${tr}deg`)
    el.style.color = Math.random() > 0.5 ? '#00FF88' : '#8B5CF6'

    containerRef.current.appendChild(el)
    wordCount.current++

    setTimeout(() => {
      el.remove()
      wordCount.current--
    }, 2000)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      spawnWord(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [spawnWord])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9990]" />
}
