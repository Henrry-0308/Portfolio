"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import styles from "./AboutSection.module.css";
import AIBrainAnimation from "./AIBrainAnimation";

import aboutData from "@/data/AboutData";

export default function AboutSection() {
  return (
    <section id="about" className={`${styles.about} section`}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className={styles.content}>
          <motion.div
            className={styles.timeline}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={styles.timelineTitle}>Education</h3>

            {aboutData.education.map((item, index) => (
              <div className={styles.timelineItem} key={index}>
                <div className={styles.timelineIcon}>
                  {item.icon}
                </div>
                <div className={styles.timelineContent}>
                  <h4>{item.degree}</h4>
                  <p>{item.institution}</p>
                  <span className={styles.timelinePeriod}>{item.year}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className={styles.bio}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.bioTitle}>My Journey in AI & ML</h3>
            {aboutData.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className={styles.aiQuote}>
              <Brain className={styles.quoteIcon} />
              <blockquote>{aboutData.quote.text}</blockquote>
              <cite>— {aboutData.quote.author}</cite>
            </div>
          </motion.div>

          <motion.div
            className={styles.timeline}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={styles.timelineTitle}>Certifications</h3>

            {aboutData.certification.map((item, index) => (
              <div className={styles.timelineItem} key={index}>
                <div className={styles.timelineIcon}>
                  {item.icon}
                </div>
                <div className={styles.timelineContent}>
                  <h4>{item.name}</h4>
                  <p>{item.from}</p>
                  <span className={styles.timelinePeriod}>{item.year}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={styles.aiVisualization}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AIBrainAnimation />
          <div className={styles.funFact}>
            <h3>Did you know?</h3>
            <p>
              {aboutData.trend}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
