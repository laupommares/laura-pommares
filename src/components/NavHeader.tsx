import { getLocale, getTranslations } from "next-intl/server";
import LocaleSwitch from "./LocaleSwitch";
import type { Locale } from "@/i18n/config";

export default async function NavHeader() {
  const t = await getTranslations("Nav");
  const tCv = await getTranslations("Cv");
  const locale = (await getLocale()) as Locale;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-subtle">
      <div className="flex justify-between items-center h-16 px-margin-mobile max-w-container-max mx-auto">
        <a
          className="text-lg font-bold"
          href="#"
        >
          {t("brand")}
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-medium hover:text-accent transition-colors"
            href="#perfil"
          >
            {t("links.trajectory")}
          </a>
          <a
            className="text-sm font-medium hover:text-accent transition-colors"
            href="#experiencia"
          >
            {t("links.experience")}
          </a>
          <a
            className="text-sm font-medium hover:text-accent transition-colors"
            href="#proyectos"
          >
            {t("links.projects")}
          </a>
          <a
            className="text-sm font-medium hover:text-accent transition-colors"
            href="#stack"
          >
            {t("links.stack")}
          </a>
          <a
            className="text-sm font-medium hover:text-accent transition-colors"
            href="#educacion"
          >
            {t("links.education")}
          </a>
          <a
            className="text-sm font-medium hover:text-accent transition-colors"
            href="#certificaciones"
          >
            {t("links.certifications")}
          </a>
        </nav>
        <div className="flex items-center gap-6">
          <LocaleSwitch currentLocale={locale} />
          <a
            className="hidden md:block text-sm font-medium border-b border-primary hover:border-accent hover:text-accent transition-all"
            href={tCv("downloadHref")}
          >
            {t("downloadCv")}
          </a>
          <a
            className="px-5 py-2.5 bg-primary text-white text-sm font-medium hover:bg-accent transition-colors min-w-30 text-center"
            href="#contacto"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
