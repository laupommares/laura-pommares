import { getTranslations } from "next-intl/server";
import { GITHUB_URL, LINKEDIN_URL, whatsappUrl } from "@/data/contact";

const linkClass =
  "text-sm font-bold border-b-2 border-primary hover:border-accent hover:text-accent transition-all pb-1";

export default async function ContactSection() {
  const t = await getTranslations("Contact");
  const tCv = await getTranslations("Cv");
  const tNav = await getTranslations("Nav");

  const links = [
    { href: LINKEDIN_URL, label: t("linkedin"), external: true },
    { href: tCv("downloadHref"), label: tNav("downloadCv"), download: true },
    { href: whatsappUrl(), label: t("whatsapp"), external: true },
    { href: GITHUB_URL, label: t("github"), external: true },
  ];

  return (
    <section className="px-margin-mobile max-w-container-max mx-auto py-16 md:py-30 reveal" id="contacto">
      <div className="max-w-4xl">
        <h2 className="font-headline text-display mb-6 md:mb-8">
          {t("headingLine1")} <br />
          <span className="text-accent underline decoration-1 underline-offset-8">{t("headingLine2")}</span>
        </h2>
        <p className="font-body text-body-lg text-secondary mb-12 max-w-2xl">{t("subtitle")}</p>
        <div className="flex flex-col items-start gap-8">
          <a
            className="text-xl sm:text-2xl md:text-4xl font-headline font-bold hover:text-accent transition-colors break-all"
            href={`mailto:${t("email")}`}
          >
            {t("email")}
          </a>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {links.map((link) => (
              <a
                key={link.label}
                className={linkClass}
                href={link.href}
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                {...(link.download && { download: true })}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
