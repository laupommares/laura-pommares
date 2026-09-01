import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations("Hero");
  const tCv = await getTranslations("Cv");
  const stats = t.raw("stats") as { label: string; value: string }[];

  return (
    <section className="px-margin-mobile max-w-container-max mx-auto mb-16 md:mb-section-gap reveal">
      <div className="max-w-5xl">
        <h1 className="font-headline text-display mb-6 md:mb-8">
          {t("titleLine1")} <br />
          <span className="text-accent italic">{t("titleLine2")}</span>
        </h1>
        <p className="font-body text-body-lg text-secondary mb-10 md:mb-12">
          {t("description")}
        </p>
        <div className="grid md:grid-cols-4 md:gap-8 divide-y divide-subtle md:divide-y-0 py-2 md:py-10 border-y border-subtle mb-10 md:mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-baseline justify-between gap-4 py-3.5 md:block md:py-0"
            >
              <span className="font-label-mono text-[11px] text-secondary uppercase whitespace-nowrap md:mb-2 md:block">
                {stat.label}
              </span>
              <span className="text-[13px] md:text-sm font-medium leading-snug text-right md:text-left">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6">
          <a
            className="inline-flex items-center justify-center bg-primary text-white px-8 md:px-10 py-4 text-sm font-medium hover:bg-accent transition-colors"
            href="#proyectos"
          >
            {t("viewProjects")}
          </a>
          <a
            className="border border-primary px-8 md:px-10 py-4 text-sm font-medium hover:bg-surface-alt transition-colors inline-flex items-center justify-center gap-2"
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
