"use client"

import { useEffect, useRef } from "react"
import styles from "./AIBrainAnimation.module.css"

export default function AIBrainAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Brain nodes
    class Node {
      x: number
      y: number
      radius: number
      color: string
      connections: Node[]
      pulseSpeed: number
      pulseOffset: number
      vx: number
      vy: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.radius = Math.random() * 2 + 2
        this.color = "#00f5ff"
        this.connections = []
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseOffset = Math.random() * Math.PI * 2
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
      }

      update(time: number) {
        // Move slightly
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
          this.vx *= -1
        }
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
          this.vy *= -1
        }

        // Pulse effect
        const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.5 + 1
        return pulse
      }

      draw(ctx: CanvasRenderingContext2D, pulse: number) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      connect(node: Node) {
        if (!this.connections.includes(node)) {
          this.connections.push(node)
        }
      }

      drawConnections(ctx: CanvasRenderingContext2D, time: number) {
        this.connections.forEach((node) => {
          const distance = Math.sqrt(Math.pow(this.x - node.x, 2) + Math.pow(this.y - node.y, 2))
          const maxDistance = 100

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            const pulse = Math.sin(time * 0.5 + this.pulseOffset) * 0.2 + 0.8

            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(node.x, node.y)
            ctx.strokeStyle = `rgba(0, 245, 255, ${opacity * pulse * 0.5})`
            ctx.lineWidth = 0.5
            ctx.stroke()

            // Draw data packet traveling along connection
            const packetSpeed = 0.0005
            const packetPosition = (time * packetSpeed + this.pulseOffset) % 1
            const packetX = this.x + (node.x - this.x) * packetPosition
            const packetY = this.y + (node.y - this.y) * packetPosition

            ctx.beginPath()
            ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(57, 255, 20, ${opacity * pulse})`
            ctx.fill()
          }
        })
      }
    }

    // Create brain shape
    const createBrainShape = () => {
      const nodes: Node[] = []
      const numNodes = Math.min(50, Math.floor(canvas.width / 20))

      // Create nodes in a brain-like shape
      for (let i = 0; i < numNodes; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * canvas.width * 0.3 + canvas.width * 0.1
        const x = canvas.width / 2 + Math.cos(angle) * radius
        const y = canvas.height / 2 + Math.sin(angle) * radius
        nodes.push(new Node(x, y))
      }

      // Connect nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.sqrt(Math.pow(nodes[i].x - nodes[j].x, 2) + Math.pow(nodes[i].y - nodes[j].y, 2))

          if (distance < 100) {
            nodes[i].connect(nodes[j])
          }
        }
      }

      return nodes
    }

    const nodes = createBrainShape()

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Draw connections first (behind nodes)
      nodes.forEach((node) => {
        node.drawConnections(ctx, time)
      })

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = node.update(time)
        node.draw(ctx, pulse)
      })
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}

