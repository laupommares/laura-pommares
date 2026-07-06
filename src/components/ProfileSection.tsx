import { getTranslations } from "next-intl/server";

export default async function ProfileSection() {
  const t = await getTranslations("Profile");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section
      className="px-margin-mobile max-w-container-max mx-auto mb-section-gap reveal"
      id="perfil"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <h2 className="font-label-mono text-accent uppercase tracking-widest">
            {t("heading")}
          </h2>
        </div>
        <div className="md:col-span-8">
          <p className="font-headline text-headline-md mb-8 leading-tight">
            {t("lead")}
          </p>
          <div className="grid grid-cols-1 gap-6">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
