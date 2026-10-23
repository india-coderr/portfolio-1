import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e) => {
      const el = e.target
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[data-cursor="expand"]') ||
        el.classList.contains('cursor-expand')
      ) {
        setExpanded(true)
      }
    }

    const handleMouseOut = (e) => {
      const el = e.target
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[data-cursor="expand"]') ||
        el.classList.contains('cursor-expand')
      ) {
        setExpanded(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // Smooth follow animation
    let raf
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      
      if (cursorRef.current) {
        const size = expanded ? 48 : 16
        cursorRef.current.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(raf)
    }
  }, [expanded])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${expanded ? 'expanded' : ''}`}
      style={{ willChange: 'transform' }}
    />
  )
}
