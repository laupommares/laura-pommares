import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations("Hero");
  const tCv = await getTranslations("Cv");
  const stats = t.raw("stats") as { label: string; value: string }[];

  return (
    <section className="px-margin-mobile max-w-container-max mx-auto mb-16 md:mb-section-gap reveal">
      <div className="max-w-5xl">
        <h1 className="font-headline text-display mb-8">
          {t("titleLine1")} <br />
          <span className="text-accent italic">{t("titleLine2")}</span>
        </h1>
        <p className="font-body text-body-lg text-secondary max-w-2xl mb-12 leading-relaxed">
          {t("description")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-subtle mb-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="block font-label-mono text-[11px] text-secondary uppercase mb-2">
                {stat.label}
              </span>
              <span className="text-sm font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a
            className="inline-flex items-center justify-center bg-primary text-white px-10 py-4 text-sm font-medium hover:bg-accent transition-colors"
            href="#proyectos"
          >
            {t("viewProjects")}
          </a>
          <a
            className="border border-primary px-10 py-4 text-sm font-medium hover:bg-surface-alt transition-colors inline-flex items-center gap-2"
            href={tCv("downloadHref")}
            download
          >
            <span className="material-symbols-outlined">download</span>
            {t("downloadCv")}
          </a>
        </div>
      </div>
    </section>
  );
}
