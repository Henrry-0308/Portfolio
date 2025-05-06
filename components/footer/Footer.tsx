import Link from "next/link"
import { Heart, Github, Linkedin, Facebook, Instagram, Youtube, Mail } from "lucide-react"
import styles from "./Footer.module.css"

import HeroData from "@/data/HeroData.json"
import LinkData from "@/data/LinkData.json"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link href="/">
              <span className={styles.logoText}>{HeroData.shortName}</span>
            </Link>
            <p className={styles.tagline}>{HeroData.description[0]} & {HeroData.description[1]} & {HeroData.description[2]}</p>
          </div>

          <div className={styles.socialLinks}>
            <a
              href={LinkData.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={LinkData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={LinkData.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href={LinkData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={LinkData.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a href={`mailto:${LinkData.gamil}`} className={styles.socialLink} aria-label="Email">
              <Mail size={20} />
            </a>
          </div>

          <div className={styles.copyright}>
            <p>© {currentYear} {HeroData.name}. All rights reserved.</p>
            <p className={styles.builtWith}>
              Built with <Heart size={14} className={styles.heartIcon} /> using Next.js
            </p>
          </div>

          <div className={styles.links}>
            <Link href="#home" className={styles.link}>
              Home
            </Link>
            <Link href="#about" className={styles.link}>
              About
            </Link>
            <Link href="#skills" className={styles.link}>
              Skills
            </Link>
            <Link href="#projects" className={styles.link}>
              Projects
            </Link>
            <Link href="#experience" className={styles.link}>
              Experience
            </Link>
            <Link href="#contact" className={styles.link}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

