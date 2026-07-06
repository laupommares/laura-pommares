import { getTranslations } from "next-intl/server";

export default async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tCv = await getTranslations("Cv");

  return (
    <footer className="border-t border-subtle py-20 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 px-margin-mobile max-w-container-max mx-auto">
        <div>
          <span className="text-primary font-bold text-lg tracking-tighter">
            {t("brand")}
          </span>
          <p className="font-label-mono text-[10px] text-secondary mt-1">
            {t("copyright")}
          </p>
        </div>
        <div className="flex gap-12 font-label-mono text-[10px] uppercase tracking-widest font-bold">
          <a className="hover:text-accent transition-colors" href="#proyectos">
            {t("links.projects")}
          </a>
          <a
            className="hover:text-accent transition-colors"
            href="#experiencia"
          >
            {t("links.experience")}
          </a>
          <a className="hover:text-accent transition-colors" href={tCv("downloadHref")}>
            {t("links.downloadCv")}
          </a>
        </div>
      </div>
    </footer>
  );
}
