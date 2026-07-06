import { getTranslations } from "next-intl/server";

type CertificationItem = { title: string; issuer: string };

export default async function CertificationsSection() {
  const t = await getTranslations("Certifications");
  const certifications = t.raw("items") as CertificationItem[];

  return (
    <section
      className="px-margin-mobile max-w-container-max mx-auto reveal"
      id="certificaciones"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <h2 className="font-label-mono text-accent uppercase tracking-widest">
            {t("heading")}
          </h2>
        </div>
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          {certifications.map((cert) => (
            <div key={cert.title}>
              <h3 className="text-lg font-bold mb-1">{cert.title}</h3>
              <p className="text-accent text-sm font-medium">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
