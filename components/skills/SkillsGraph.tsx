"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import styles from "./SkillsGraph.module.css"

interface SkillsGraphProps {
  activeCategory: string
}

export default function SkillsGraph({ activeCategory }: SkillsGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<any[]>([])

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

    // Define colors based on category
    const getCategoryColors = (category: string) => {
      const colors = {
        programming: { primary: "#00f5ff", secondary: "#0088ff" },
        ml: { primary: "#b14aed", secondary: "#7209b7" },
        mlops: { primary: "#4cc9f0", secondary: "#00b4d8" },
        genai: { primary: "#39ff14", secondary: "#00cc00" },
        data: { primary: "#ff9e00", secondary: "#ff6b00" },
        research: { primary: "#ff5e78", secondary: "#ff0055" },
      }

      return colors[category as keyof typeof colors] || colors.programming
    }

    const colors = getCategoryColors(activeCategory)

    // Create nodes
    class Node {
      x: number
      y: number
      size: number
      speed: number
      color: string
      connections: Node[]
      angle: number

      constructor(x: number, y: number, size: number, color: string) {
        this.x = x
        this.y = y
        this.size = size
        this.speed = Math.random() * 0.02 + 0.01
        this.color = color
        this.connections = []
        this.angle = Math.random() * Math.PI * 2
      }

      update() {
        // Orbit around center
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const radius = Math.sqrt(Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2))

        this.angle += this.speed
        this.x = centerX + Math.cos(this.angle) * radius
        this.y = centerY + Math.sin(this.angle) * radius
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Glow effect
        ctx.shadowColor = this.color
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      }

      connect(node: Node) {
        if (!this.connections.includes(node)) {
          this.connections.push(node)
        }
      }

      drawConnections(ctx: CanvasRenderingContext2D, time: number) {
        this.connections.forEach((node) => {
          // Create gradient for connection
          const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y)
          gradient.addColorStop(0, this.color)
          gradient.addColorStop(1, node.color)

          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(node.x, node.y)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Animated particle along the connection
          const particlePosition = (time * 0.5) % 1
          const particleX = this.x + (node.x - this.x) * particlePosition
          const particleY = this.y + (node.y - this.y) * particlePosition

          ctx.beginPath()
          ctx.arc(particleX, particleY, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = "#ffffff"
          ctx.fill()
        })
      }
    }

    // Create graph
    const createGraph = () => {
      const nodes: Node[] = []
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Create central node
      const centralNode = new Node(centerX, centerY, 8, colors.primary)
      nodes.push(centralNode)

      // Create surrounding nodes
      const numNodes = 12
      const minRadius = Math.min(canvas.width, canvas.height) * 0.2
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4

      for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2
        const radius = minRadius + Math.random() * (maxRadius - minRadius)
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        const size = Math.random() * 3 + 3

        // Alternate colors
        const color = i % 2 === 0 ? colors.primary : colors.secondary

        const node = new Node(x, y, size, color)
        nodes.push(node)

        // Connect to central node
        centralNode.connect(node)

        // Connect to previous node
        if (i > 0) {
          nodes[i].connect(nodes[i + 1])
        }
      }

      // Connect last node to first
      if (nodes.length > 2) {
        nodes[nodes.length - 1].connect(nodes[1])
      }

      // Add some random connections
      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 2; j < nodes.length; j++) {
          if (Math.random() > 0.7) {
            nodes[i].connect(nodes[j])
          }
        }
      }

      return nodes
    }

    const newNodes = createGraph()
    setNodes(newNodes)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Draw connections
      nodes.forEach((node) => {
        node.drawConnections(ctx, time)
      })

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update()
        node.draw(ctx)
      })
    }

    animate()
    
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [activeCategory])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const createGraphAndUpdate = () => {
      const getCategoryColors = (category: string) => {
        const colors = {
          programming: { primary: "#00f5ff", secondary: "#0088ff" },
          ml: { primary: "#b14aed", secondary: "#7209b7" },
          mlops: { primary: "#4cc9f0", secondary: "#00b4d8" },
          genai: { primary: "#39ff14", secondary: "#00cc00" },
          data: { primary: "#ff9e00", secondary: "#ff6b00" },
          research: { primary: "#ff5e78", secondary: "#ff0055" },
        }

        return colors[category as keyof typeof colors] || colors.programming
      }

      const colors = getCategoryColors(activeCategory)

      class Node {
        x: number
        y: number
        size: number
        speed: number
        color: string
        connections: Node[]
        angle: number

        constructor(x: number, y: number, size: number, color: string) {
          this.x = x
          this.y = y
          this.size = size
          this.speed = Math.random() * 0.02 + 0.01
          this.color = color
          this.connections = []
          this.angle = Math.random() * Math.PI * 2
        }

        update() {
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const radius = Math.sqrt(Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2))

          this.angle += this.speed
          this.x = centerX + Math.cos(this.angle) * radius
          this.y = centerY + Math.sin(this.angle) * radius
        }

        draw(ctx: CanvasRenderingContext2D) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()

          ctx.shadowColor = this.color
          ctx.shadowBlur = 10
          ctx.fill()
          ctx.shadowBlur = 0
        }

        connect(node: Node) {
          if (!this.connections.includes(node)) {
            this.connections.push(node)
          }
        }

        drawConnections(ctx: CanvasRenderingContext2D, time: number) {
          this.connections.forEach((node) => {
            const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y)
            gradient.addColorStop(0, this.color)
            gradient.addColorStop(1, node.color)

            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(node.x, node.y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.stroke()

            const particlePosition = (time * 0.5) % 1
            const particleX = this.x + (node.x - this.x) * particlePosition
            const particleY = this.y + (node.y - this.y) * particlePosition

            ctx.beginPath()
            ctx.arc(particleX, particleY, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = "#ffffff"
            ctx.fill()
          })
        }
      }

      const createGraph = () => {
        const nodes: Node[] = []
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        const centralNode = new Node(centerX, centerY, 8, colors.primary)
        nodes.push(centralNode)

        const numNodes = 12
        const minRadius = Math.min(canvas.width, canvas.height) * 0.2
        const maxRadius = Math.min(canvas.width, canvas.height) * 0.4

        for (let i = 0; i < numNodes; i++) {
          const angle = (i / numNodes) * Math.PI * 2
          const radius = minRadius + Math.random() * (maxRadius - minRadius)
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius
          const size = Math.random() * 3 + 3

          const color = i % 2 === 0 ? colors.primary : colors.secondary

          const node = new Node(x, y, size, color)
          nodes.push(node)

          centralNode.connect(node)

          if (i > 0) {
            nodes[i].connect(nodes[i + 1])
          }
        }

        if (nodes.length > 2) {
          nodes[nodes.length - 1].connect(nodes[1])
        }

        for (let i = 1; i < nodes.length; i++) {
          for (let j = i + 2; j < nodes.length; j++) {
            if (Math.random() > 0.7) {
              nodes[i].connect(nodes[j])
            }
          }
        }

        return nodes
      }

      const newNodes = createGraph()
      setNodes(newNodes)
    }

    createGraphAndUpdate()
  }, [activeCategory])

  return (
    <motion.div
      className={styles.container}
      key={activeCategory}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </motion.div>
  )
}

