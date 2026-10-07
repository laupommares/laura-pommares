import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import NavHeader from "@/components/NavHeader";
import HeroSection from "@/components/HeroSection";
import ProfileSection from "@/components/ProfileSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import TechStackSection from "@/components/TechStackSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import ScrollEffects from "@/components/ScrollEffects";
import { pageMetadata } from "@/data/metadata";
import type { Locale } from "@/i18n/config";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/",
    locale,
    ogAlt: t("ogAlt"),
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ScrollEffects />
      <NavHeader />
      <main className="pt-24 md:pt-40">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <ProfileSection />
        <TechStackSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
