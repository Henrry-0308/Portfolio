"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import styles from "./SkillsSection.module.css"
import SkillCard from "./SkillCard"
import SkillsGraph from "./SkillsGraph"

import skillData from "@/data/SkillData"

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("programming")

  return (
    <section id="skills" className={`${styles.skills} section`}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills & Expertise
        </motion.h2>

        <motion.div
          className={styles.categories}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skillData.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryTitle}>{category.title}</span>
            </button>
          ))}
        </motion.div>

        <div className={styles.skillsContainer}>
          {skillData.map((category) => (
            <motion.div
              key={category.id}
              className={`${styles.skillsGrid} ${activeCategory === category.id ? styles.active : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeCategory === category.id ? 1 : 0,
                y: activeCategory === category.id ? 0 : 20,
                display: activeCategory === category.id ? "grid" : "none",
              }}
              transition={{ duration: 0.5 }}
            >
              {category.skills.map((skill, index) => (
                <SkillCard key={skill.name} name={skill.name} level={skill.level} delay={index * 0.1} icon={skill.icon} />
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.skillsVisual}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SkillsGraph activeCategory={activeCategory} />
        </motion.div>
      </div>
    </section>
  )
}

