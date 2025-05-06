"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import styles from "./AIModelVisualizer.module.css"

export default function AIModelVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create brain structure
    const brainGroup = new THREE.Group()
    scene.add(brainGroup)

    // Create neurons (nodes)
    const neuronGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const neuronMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.8,
    })

    // Create synapses (connections)
    const synapsesMaterial = new THREE.LineBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.3,
    })

    // Create neurons in a 3D grid pattern
    const neurons = []
    const gridSize = 5
    const spacing = 5

    for (let x = -gridSize; x <= gridSize; x += 2) {
      for (let y = -gridSize; y <= gridSize; y += 2) {
        for (let z = -gridSize; z <= gridSize; z += 2) {
          // Add some randomness to positions
          const xPos = x * spacing + (Math.random() - 0.5) * spacing
          const yPos = y * spacing + (Math.random() - 0.5) * spacing
          const zPos = z * spacing + (Math.random() - 0.5) * spacing

          const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial.clone())
          neuron.position.set(xPos, yPos, zPos)

          // Random scale for variety
          const scale = Math.random() * 0.5 + 0.5
          neuron.scale.set(scale, scale, scale)

          brainGroup.add(neuron)
          neurons.push(neuron)

          // Pulse animation data
          neuron.userData = {
            originalScale: scale,
            pulseSpeed: Math.random() * 0.02 + 0.01,
            pulseOffset: Math.random() * Math.PI * 2,
          }
        }
      }
    }

    // Create connections between nearby neurons
    const maxConnectionDistance = spacing * 2.5
    const connections = []

    for (let i = 0; i < neurons.length; i++) {
      for (let j = i + 1; j < neurons.length; j++) {
        const distance = neurons[i].position.distanceTo(neurons[j].position)

        if (distance < maxConnectionDistance) {
          const points = [neurons[i].position.clone(), neurons[j].position.clone()]

          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
          const line = new THREE.Line(lineGeometry, synapsesMaterial.clone())

          brainGroup.add(line)
          connections.push({
            line,
            startNeuron: neurons[i],
            endNeuron: neurons[j],
            pulseSpeed: Math.random() * 0.01 + 0.005,
            pulseOffset: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Rotate the entire brain structure
      brainGroup.rotation.y = time * 0.1
      brainGroup.rotation.z = Math.sin(time * 0.05) * 0.2

      // Animate neurons (pulsing)
      neurons.forEach((neuron) => {
        const { originalScale, pulseSpeed, pulseOffset } = neuron.userData
        const pulse = Math.sin(time * pulseSpeed + pulseOffset) * 0.2 + 1
        neuron.scale.set(originalScale * pulse, originalScale * pulse, originalScale * pulse)
      })

      // Animate connections (opacity pulsing)
      connections.forEach((connection) => {
        const { line, pulseSpeed, pulseOffset } = connection
        const pulse = Math.sin(time * pulseSpeed + pulseOffset) * 0.3 + 0.5
        ;(line.material as THREE.LineBasicMaterial).opacity = pulse * 0.3
      })

      renderer.render(scene, camera)
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose resources
      neurons.forEach((neuron) => {
        neuron.geometry.dispose()
        ;(neuron.material as THREE.Material).dispose()
      })

      connections.forEach((connection) => {
        connection.line.geometry.dispose()
        ;(connection.line.material as THREE.Material).dispose()
      })
    }
  }, [])

  return <div ref={containerRef} className={styles.container} />
}

