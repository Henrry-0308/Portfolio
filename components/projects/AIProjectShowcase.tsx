"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, Code, Server, Database, Cpu } from "lucide-react"
import styles from "./AIProjectShowcase.module.css"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  repoUrl: string
}

interface AIProjectShowcaseProps {
  project: Project
  onClose: () => void
}

export default function AIProjectShowcase({ project, onClose }: AIProjectShowcaseProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  // Mock project details
  const projectDetails = {
    overview: `${project.title} is an advanced AI-powered solution that leverages state-of-the-art machine learning techniques to solve complex problems in its domain. The project was developed with a focus on accuracy, efficiency, and scalability.`,
    architecture: [
      { name: "Frontend", tech: "React, TypeScript, Material UI" },
      { name: "Backend", tech: "FastAPI, Python 3.9+" },
      { name: "ML Pipeline", tech: "PyTorch, TensorFlow, ONNX Runtime" },
      { name: "Deployment", tech: "Docker, Kubernetes, AWS" },
      { name: "Monitoring", tech: "Prometheus, Grafana, MLflow" },
    ],
    features: [
      "Real-time inference with optimized model serving",
      "Automated data preprocessing and feature engineering",
      "Comprehensive model monitoring and drift detection",
      "A/B testing framework for model evaluation",
      "Explainable AI components for transparency",
      "Scalable architecture supporting high throughput",
    ],
    results: {
      accuracy: "98.5%",
      latency: "45ms",
      throughput: "1000 requests/second",
      improvement: "35% better than previous solutions",
    },
  }

  // Typing effect for the overview
  useEffect(() => {
    if (activeTab === "overview" && isTyping) {
      const text = projectDetails.overview
      let currentIndex = 0

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setTypedText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
        }
      }, 20)

      return () => clearInterval(typingInterval)
    }
  }, [activeTab, isTyping, projectDetails.overview])

  // Reset typing when tab changes
  useEffect(() => {
    if (activeTab === "overview") {
      setTypedText("")
      setIsTyping(true)
    }
  }, [activeTab])

  return (
    <AnimatePresence>
      <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>

          <div className={styles.header}>
            <h2 className={styles.title}>{project.title}</h2>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`${styles.tab} ${activeTab === "architecture" ? styles.active : ""}`}
              onClick={() => setActiveTab("architecture")}
            >
              Architecture
            </button>
            <button
              className={`${styles.tab} ${activeTab === "features" ? styles.active : ""}`}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              className={`${styles.tab} ${activeTab === "results" ? styles.active : ""}`}
              onClick={() => setActiveTab("results")}
            >
              Results
            </button>
          </div>

          <div className={styles.content}>
            {activeTab === "overview" && (
              <div className={styles.overview}>
                <div className={styles.terminal}>
                  <div className={styles.terminalHeader}>
                    <span className={styles.terminalDot}></span>
                    <span className={styles.terminalDot}></span>
                    <span className={styles.terminalDot}></span>
                    <span className={styles.terminalTitle}>project-overview.md</span>
                  </div>
                  <div className={styles.terminalBody}>
                    <span className={styles.cursor}>{typedText}</span>
                  </div>
                </div>

                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.githubButton}>
                  <Github size={18} />
                  <span>View on GitHub</span>
                </a>
              </div>
            )}

            {activeTab === "architecture" && (
              <div className={styles.architecture}>
                <div className={styles.architectureDiagram}>
                  <div className={styles.architectureLayer}>
                    <div className={styles.architectureNode}>
                      <Code size={24} />
                      <span>Frontend</span>
                    </div>
                  </div>
                  <div className={styles.architectureArrow}></div>
                  <div className={styles.architectureLayer}>
                    <div className={styles.architectureNode}>
                      <Server size={24} />
                      <span>Backend</span>
                    </div>
                  </div>
                  <div className={styles.architectureArrow}></div>
                  <div className={styles.architectureLayer}>
                    <div className={styles.architectureNode}>
                      <Cpu size={24} />
                      <span>ML Pipeline</span>
                    </div>
                  </div>
                  <div className={styles.architectureArrow}></div>
                  <div className={styles.architectureLayer}>
                    <div className={styles.architectureNode}>
                      <Database size={24} />
                      <span>Data Storage</span>
                    </div>
                  </div>
                </div>

                <div className={styles.architectureDetails}>
                  <h3>Technical Stack</h3>
                  <ul className={styles.stackList}>
                    {projectDetails.architecture.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={styles.stackItem}
                      >
                        <strong>{item.name}:</strong> {item.tech}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className={styles.features}>
                <ul className={styles.featuresList}>
                  {projectDetails.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={styles.featureItem}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "results" && (
              <div className={styles.results}>
                <div className={styles.resultsGrid}>
                  <motion.div
                    className={styles.resultCard}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3>Accuracy</h3>
                    <div className={styles.resultValue}>{projectDetails.results.accuracy}</div>
                  </motion.div>

                  <motion.div
                    className={styles.resultCard}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3>Latency</h3>
                    <div className={styles.resultValue}>{projectDetails.results.latency}</div>
                  </motion.div>

                  <motion.div
                    className={styles.resultCard}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3>Throughput</h3>
                    <div className={styles.resultValue}>{projectDetails.results.throughput}</div>
                  </motion.div>

                  <motion.div
                    className={styles.resultCard}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3>Improvement</h3>
                    <div className={styles.resultValue}>{projectDetails.results.improvement}</div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

