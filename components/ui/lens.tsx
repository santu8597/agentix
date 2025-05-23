"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LensProps {
  children: React.ReactNode
  hovering: boolean
  setHovering: (hovering: boolean) => void
  zoom?: number
}

export function Lens({ children, hovering, setHovering, zoom = 1.15 }: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height
      setPosition({ x, y })
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Original content */}
      <motion.div
        animate={{
          scale: hovering ? zoom : 1,
          filter: hovering ? "brightness(1.1) contrast(1.05)" : "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
        }}
      >
        {children}
      </motion.div>

      {/* Lens highlight effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 pointer-events-none"
        animate={{
          opacity: hovering ? 0.2 : 0,
          rotate: hovering ? 15 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
    </motion.div>
  )
}
