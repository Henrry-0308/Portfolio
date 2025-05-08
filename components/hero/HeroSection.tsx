"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  FileText,
  ArrowDown,
  Facebook,
  Instagram,
  Youtube,
  Link,
} from "lucide-react";
import styles from "./HeroSection.module.css";
import AnimatedBackground from "./AnimatedBackground";
import AIModelVisualizer from "./AIModelVisualizer";

import heroData from "@/data/HeroData.json";
import linkData from "@/data/LinkData.json";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className={styles.hero} ref={sectionRef}>
      <AnimatedBackground />
      <div className={styles.aiModelContainer}>
        <AIModelVisualizer />
      </div>

      <div className={styles.section}>
        <motion.div
          initial={{ opacity: 0, y: 20, zIndex: 10, display: "flex", justifyContent: "center" }}
          animate={{ opacity: 1, y: 0, zIndex: 10, display: "flex", justifyContent: "center" }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={heroData.image}
            alt="Portrait"
            width={350}
            height={350}
            className={styles.image}
          />
        </motion.div>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.intro}
          >
            <h1 className={styles.name}>{heroData.name}</h1>
            <h2 className={styles.title}>
              {heroData.description[0]} | {heroData.description[1]} |{" "}
              {heroData.description[2]}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={styles.cta}
          >
            {/* <a
              href={linkData.resume}
              className={`${styles.button} ${styles.primary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={18} />
              <span>View Resume</span>
            </a> */}

            <div className={styles.socialLinks}>
              <a
                href={linkData.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={linkData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={linkData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={linkData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={linkData.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>

            <button
              onClick={handleScrollDown}
              className={`${styles.button} ${styles.secondary}`}
            >
              <span>See My Work</span>
              <ArrowDown size={18} />
            </button>
          </motion.div>
        </div>
      </div>

      <div className={styles.scrollIndicator} onClick={handleScrollDown}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <div className={styles.arrows}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}
