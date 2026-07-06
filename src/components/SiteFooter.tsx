import { getTranslations } from "next-intl/server";

export default async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tCv = await getTranslations("Cv");

  const links = [
    { href: "#perfil", label: tNav("links.trajectory") },
    { href: "#experiencia", label: tNav("links.experience") },
    { href: "#proyectos", label: tNav("links.projects") },
    { href: "#stack", label: tNav("links.stack") },
    { href: "#educacion", label: tNav("links.education") },
    { href: "#certificaciones", label: tNav("links.certifications") },
  ];

  return (
    <footer className="border-t border-subtle pt-16 pb-10 bg-white">
      <div className="px-margin-mobile max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-8">
          <span className="text-primary font-bold text-lg tracking-tighter">
            {t("brand")}
          </span>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-label-mono text-[10px] uppercase tracking-widest text-secondary">
            {links.map((link) => (
              <a
                key={link.href}
                className="hover:text-accent transition-colors"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <a
              className="text-sm font-medium border-b border-primary hover:border-accent hover:text-accent transition-all"
              href={tCv("downloadHref")}
            >
              {t("links.downloadCv")}
            </a>
            <a
              className="px-5 py-2.5 bg-primary text-white text-sm font-medium hover:bg-accent transition-colors min-w-30 text-center"
              href="#contacto"
            >
              {tNav("cta")}
            </a>
          </div>
        </div>
        <p className="font-label-mono text-[10px] text-secondary text-center lg:text-left">
          {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
