import { getTranslations } from "next-intl/server";

export default async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <section className="px-margin-mobile max-w-container-max mx-auto py-30 reveal" id="contacto">
      <div className="max-w-4xl">
        <h2 className="font-headline text-display mb-12">
          {t("headingLine1")} <br />
          <span className="text-accent underline decoration-1 underline-offset-8">{t("headingLine2")}</span>.
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
          <a
            className="text-3xl md:text-4xl font-headline font-bold hover:text-accent transition-colors"
            href={`mailto:${t("email")}`}
          >
           {t("email")}
          </a>
          <div className="flex gap-8">
            <a
              className="text-sm font-bold border-b-2 border-primary hover:border-accent hover:text-accent transition-all pb-1"
              href="https://wa.me/5492346507655"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("whatsapp")}
            </a>
            <a
              className="text-sm font-bold border-b-2 border-primary hover:border-accent hover:text-accent transition-all pb-1"
              href="https://www.linkedin.com/in/laura-pommar%C3%A9s-40959127b/"
            >
              {t("linkedin")}
            </a>
            <a
              className="text-sm font-bold border-b-2 border-primary hover:border-accent hover:text-accent transition-all pb-1"
              href="https://github.com/laupommares"
            >
              {t("github")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
