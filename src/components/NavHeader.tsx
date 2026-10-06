import { getLocale, getTranslations } from "next-intl/server";
import LocaleSwitch from "./LocaleSwitch";
import MobileNav from "./MobileNav";
import type { Locale } from "@/i18n/config";

export default async function NavHeader() {
  const t = await getTranslations("Nav");
  const tCv = await getTranslations("Cv");
  const locale = (await getLocale()) as Locale;

  // Same order as the sections on the page. Certifications stays reachable by
  // scrolling and from the footer, but is left out of the menu to keep it light.
  const links = [
    { href: "#proyectos", label: t("links.projects") },
    { href: "#experiencia", label: t("links.experience") },
    { href: "#perfil", label: t("links.trajectory") },
    { href: "#stack", label: t("links.stack") },
    { href: "#educacion", label: t("links.education") },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-subtle">
      <div className="flex justify-between items-center h-16 px-margin-mobile max-w-container-max mx-auto">
        <a
          className="text-base md:text-lg font-bold"
          href="#"
        >
          {t("brand")}
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              className="text-sm font-medium hover:text-accent transition-colors"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5 md:gap-6">
          <LocaleSwitch currentLocale={locale} />
          <a
            className="hidden md:block text-sm font-medium border-b border-primary hover:border-accent hover:text-accent transition-all"
            href={tCv("downloadHref")}
          >
            {t("downloadCv")}
          </a>
          <a
            className="hidden md:block px-5 py-2.5 bg-primary text-white text-sm font-medium hover:bg-accent transition-colors min-w-30 text-center"
            href="#contacto"
          >
            {t("cta")}
          </a>
          <MobileNav
            links={links}
            downloadCvHref={tCv("downloadHref")}
            downloadCvLabel={t("downloadCv")}
            ctaLabel={t("cta")}
          />
        </div>
      </div>
    </header>
  );
}
