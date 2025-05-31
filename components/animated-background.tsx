"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingShape {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: "circle" | "square" | "triangle"
}

export default function AnimatedBackground() {
  const [shapes, setShapes] = useState<FloatingShape[]>([])

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: FloatingShape[] = []
      for (let i = 0; i < 15; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
          type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle",
        })
      }
      setShapes(newShapes)
    }

    generateShapes()
  }, [])

  const getShapeComponent = (shape: FloatingShape) => {
    const baseClasses = "absolute opacity-20 blur-sm"
    const glowClasses = "shadow-2xl"

    switch (shape.type) {
      case "circle":
        return (
          <div
            className={`${baseClasses} ${glowClasses} rounded-full bg-gradient-to-br from-blue-400 to-purple-600`}
            style={{
              width: shape.size,
              height: shape.size,
              boxShadow: `0 0 ${shape.size}px rgba(59, 130, 246, 0.3), 0 0 ${shape.size * 2}px rgba(147, 51, 234, 0.2)`,
            }}
          />
        )
      case "square":
        return (
          <div
            className={`${baseClasses} ${glowClasses} rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 rotate-45`}
            style={{
              width: shape.size,
              height: shape.size,
              boxShadow: `0 0 ${shape.size}px rgba(34, 211, 238, 0.3), 0 0 ${shape.size * 2}px rgba(59, 130, 246, 0.2)`,
            }}
          />
        )
      case "triangle":
        return (
          <div
            className={`${baseClasses} ${glowClasses}`}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid rgba(168, 85, 247, 0.4)`,
              filter: `drop-shadow(0 0 ${shape.size}px rgba(168, 85, 247, 0.3))`,
            }}
          />
        )
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          {getShapeComponent(shape)}
        </motion.div>
      ))}

      {/* Particle effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}
