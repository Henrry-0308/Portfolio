"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Eye } from "lucide-react"
import styles from "./ProjectCard.module.css"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  repoUrl: string
}

interface ProjectCardProps {
  project: Project
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  onShowcase: () => void
}

export default function ProjectCard({ project, index, isActive, onHover, onLeave, onShowcase }: ProjectCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={styles.imageContainer}>
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={400}
          className={styles.image}
        />
        <div className={`${styles.overlay} ${isActive ? styles.active : ""}`}>
          <div className={styles.links}>
            <button onClick={onShowcase} className={styles.link}>
              <Eye size={20} />
              <span>View Details</span>
            </button>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <Github size={20} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

