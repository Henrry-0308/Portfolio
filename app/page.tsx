import HeroSection from "@/components/hero/HeroSection"
import AboutSection from "@/components/about/AboutSection"
import SkillsSection from "@/components/skills/SkillsSection"
import ProjectsSection from "@/components/projects/ProjectsSection"
import ExperienceSection from "@/components/experience/ExperienceSection"
import ContactSection from "@/components/contact/ContactSection"
import ScrollToTop from "@/components/scrollToTop/ScrollToTop"
import Chat from "@/components/ai-assistant/AI-Assistant"

export default function Home() {
  console.log(process.env.token, process.env.OPENAI_API_KEY)
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <ScrollToTop />
      <Chat />
    </>
  )
}

