"use client"

import { useState } from "react"
import Button from "../ui/GlobalComponents/Button"
import { motion } from "framer-motion"
import { Github, AppWindow } from "lucide-react"
import styles from "./ProjectsSection.module.css"
import ProjectCard from "./ProjectCard"
import AIProjectShowcase from "./AIProjectShowcase"

import { projectData, githubData } from "@/data/ProjectData"
import linkData from "@/data/LinkData.json"

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [showcaseProject, setShowcaseProject] = useState<number | null>(null)

  return (
    <section id="projects" className={`${styles.projects} section`}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        {showcaseProject !== null && (
          <AIProjectShowcase
            project={projectData.find((p) => p.id === showcaseProject)!}
            onClose={() => setShowcaseProject(null)}
          />
        )}

        <div className={styles.projectsGrid}>
          {projectData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isActive={activeProject === project.id}
              onHover={() => setActiveProject(project.id)}
              onLeave={() => setActiveProject(null)}
              onShowcase={() => setShowcaseProject(project.id)}
            />
          ))}
        </div>

        <motion.div
          className={styles.githubStats}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>GitHub Contributions</h3>
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{githubData.repositories}+</span>
              <span className={styles.statLabel}>Repositories</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{githubData.contributions}+</span>
              <span className={styles.statLabel}>Contributions</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{githubData.stars}+</span>
              <span className={styles.statLabel}>Stars</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{githubData.forks}+</span>
              <span className={styles.statLabel}>Forks</span>
            </div>
          </div>
          <a href={linkData.github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
            <Github size={18} />
            <span>View GitHub Profile</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

