import React, { useRef, useEffect } from 'react'

// Draw many small gray 'bacteria' dots on a canvas and animate them.
// Respects prefers-reduced-motion and uses requestAnimationFrame.
export default function BacteriaCanvas({ count = 220 }) {
  const ref = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const DPR = Math.max(1, window.devicePixelRatio || 1)
    canvas.width = width * DPR
    canvas.height = height * DPR
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(DPR, DPR)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // If the system requests reduced motion, still animate but with smaller count
    const reduced = !!prefersReduced
    const actualCount = reduced ? Math.max(6, Math.round(count / 6)) : count

    // create particles (reduced-mode particles will be calmer in their params)
    particlesRef.current = Array.from({ length: actualCount }).map(() => createParticle(width, height, reduced))

    function updateFrame() {
      ctx.clearRect(0, 0, width, height)
      const t = performance.now() / 1000

      for (let p of particlesRef.current) {
        // compute perfect horizontal motion (oscillation only) — baseY stays constant
        // no additional drift or vertical wobble so particles move left/right smoothly
        p.x = p.baseX + Math.sin(t * p.oscSpeed + p.phase) * p.oscAmp
        p.y = p.baseY

        // wrap around
        // if a particle's oscillation moves it fully out of bounds, reposition its baseX so it re-enters
        if (p.baseX - p.oscAmp > width + p.r) p.baseX = -p.r - p.oscAmp
        if (p.baseX + p.oscAmp < -p.r) p.baseX = width + p.r + p.oscAmp

        // draw
        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        // slight soft shadow to stand out
        ctx.shadowColor = `rgba(0,0,0,${p.alpha * 0.28})`
        ctx.shadowBlur = p.r * 0.9
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(updateFrame)
    }

    function renderFrame() {
      ctx.clearRect(0, 0, width, height)
      for (let p of particlesRef.current) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx.shadowColor = `rgba(0,0,0,${p.alpha * 0.28})`
        ctx.shadowBlur = p.r * 0.9
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function onResize() {
      width = window.innerWidth
      height = window.innerHeight
      const DPR = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = width * DPR
      canvas.height = height * DPR
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    window.addEventListener('resize', onResize)
    animationRef.current = requestAnimationFrame(updateFrame)

    return () => {
      window.removeEventListener('resize', onResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [count])

  return <canvas ref={ref} className="particles-canvas" aria-hidden="true" />
}

function createParticle(width, height, reduced = false) {
  // positions
  const x = Math.random() * width
  const y = Math.random() * height

  // radius small but visible (4-16), tuned to be easier to spot
  const r = Math.random() * 12 + 4

  // velocities - slow base horizontal drift, vertical negligible (we'll keep motion side-to-side)
  const vx = (Math.random() - 0.5) * 0.8 // gentle horizontal drift
  const vy = (Math.random() - 0.5) * 0.06 // minimal vertical drift so they stay behind content

  // gray tone: choose in a darker range so visible
  const grayValue = Math.round(Math.random() * 120 + 60) // 60..180
  const color = `${grayValue}, ${grayValue}, ${grayValue}`

  // alpha increased so dots are clearly visible but still subtle
  const alpha = Math.random() * 0.42 + 0.36 // 0.36..0.78

  // horizontal oscillation parameters (side-to-side movement)
  // choose amplitude relative to viewport width so dots travel visibly from side to side
  const minAmp = Math.max(40, width * 0.06)
  const maxAmp = Math.max(220, width * 0.45)
  let oscAmp = Math.random() * (maxAmp - minAmp) + minAmp
  let oscSpeed = Math.random() * 1.6 + 0.45 // speed in radians/sec

  if (reduced) {
    // reduce motion intensity for reduced-motion preference but keep them moving
    oscAmp = Math.max(24, Math.min(oscAmp * 0.45, width * 0.18))
    oscSpeed = Math.random() * 0.7 + 0.18
  }
  const phase = Math.random() * Math.PI * 2

  return { x, y, baseX: x, baseY: y, r, vx, vy, color, alpha, oscAmp, oscSpeed, phase }
}
