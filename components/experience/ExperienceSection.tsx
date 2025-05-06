"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import styles from "./ExperienceSection.module.css"

import experiencesData from "@/data/ExperienceData"

export default function ExperienceSection() {
  return (
    <section id="experience" className={`${styles.experience} section`}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Work Experience
        </motion.h2>

        <div className={styles.timeline}>
          {experiencesData.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={styles.timelineContent}>
                <div className={styles.header}>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <span className={styles.company}>{exp.company}</span>
                </div>

                <div className={styles.period}>
                  <Calendar size={16} />
                  <span>{exp.period}</span>
                </div>

                <p className={styles.description}>{exp.description}</p>

                <div className={styles.achievements}>
                  <h4>Key Achievements:</h4>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

