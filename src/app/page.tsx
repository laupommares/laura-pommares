import NavHeader from "@/components/NavHeader";
import HeroSection from "@/components/HeroSection";
import ProfileSection from "@/components/ProfileSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import TechStackSection from "@/components/TechStackSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import ScrollEffects from "@/components/ScrollEffects";

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <NavHeader />
      <main className="pt-40">
        <HeroSection />
        <ProfileSection />
        <ProjectsSection />
        <ExperienceSection />
        <TechStackSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
