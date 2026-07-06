import { getTranslations } from "next-intl/server";
import "./print.css";
import PrintButton from "./PrintButton";

type ContactItem = { label: string; value: string; href?: string };
type RoleItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
};
type ProjectItem = {
  title: string;
  role: string;
  result: string;
  clients?: { name: string; href: string }[];
};
type StackCategory = { name: string; items: string[] };
type EducationItem = { institution: string; degree: string; period: string };
type CertificationItem = { title: string; issuer: string };
type LanguageItem = { name: string; level: string };

export default async function CvPage() {
  const t = await getTranslations("CvPage");

  const contact = t.raw("contact") as ContactItem[];
  const profileParagraphs = t.raw("profileParagraphs") as string[];
  const roles = t.raw("roles") as RoleItem[];
  const projects = t.raw("projects") as ProjectItem[];
  const stack = t.raw("stack") as StackCategory[];
  const education = t.raw("education") as EducationItem[];
  const certifications = t.raw("certifications") as CertificationItem[];
  const languages = t.raw("languages") as LanguageItem[];

  return (
    <main className="cv-page bg-background text-primary max-w-[800px] mx-auto px-margin-mobile py-16 print:py-0">
      <a
        href="/"
        className="cv-no-print inline-block mb-8 font-label-mono text-[11px] uppercase tracking-widest text-secondary hover:text-accent"
      >
        {t("backLink")}
      </a>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-subtle cv-avoid-break">
        <h1 className="font-headline text-headline-lg mb-2">{t("name")}</h1>
        <p className="font-headline text-headline-md text-secondary mb-6">
          {t("titleMain")} <span className="text-accent italic">{t("titleAccent")}</span>
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {contact.map((c) => (
            <div key={c.label}>
              <span className="block font-label-mono text-[10px] text-secondary uppercase tracking-widest">
                {c.label}
              </span>
              {c.href ? (
                <a href={c.href} className="text-sm font-medium">
                  {c.value}
                </a>
              ) : (
                <span className="text-sm font-medium">{c.value}</span>
              )}
            </div>
          ))}
        </div>
      </header>

      {/* Perfil */}
      <section className="mb-10 grid grid-cols-12 gap-6 cv-avoid-break">
        <h2 className="col-span-3 font-label-mono text-accent uppercase tracking-widest text-[11px]">
          {t("sections.profile")}
        </h2>
        <div className="col-span-9 space-y-3">
          {profileParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-secondary text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Experiencia */}
      <section className="mb-10 grid grid-cols-12 gap-6">
        <h2 className="col-span-3 font-label-mono text-accent uppercase tracking-widest text-[11px]">
          {t("sections.experience")}
        </h2>
        <div className="col-span-9 space-y-8">
          {roles.map((role) => (
            <div key={role.title} className="cv-avoid-break">
              <div className="flex flex-col md:flex-row md:justify-between mb-1">
                <h3 className="text-sm font-bold">{role.title}</h3>
                <span className="font-label-mono text-secondary text-[10px]">{role.period}</span>
              </div>
              <p className="text-accent text-xs font-medium mb-2">{role.company}</p>
              <p className="text-secondary text-sm leading-relaxed mb-3">{role.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {role.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-surface-alt border border-subtle font-label-mono text-[9px] uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className="mb-10 grid grid-cols-12 gap-6">
        <h2 className="col-span-3 font-label-mono text-accent uppercase tracking-widest text-[11px]">
          {t("sections.projects")}
        </h2>
        <div className="col-span-9 space-y-5">
          {projects.map((p) => (
            <div key={p.title} className="cv-avoid-break">
              <h3 className="text-sm font-bold">{p.title}</h3>
              <p className="font-label-mono text-secondary text-[10px] uppercase tracking-wide mb-1">
                {p.role}
              </p>
              <p className="text-secondary text-sm leading-relaxed">{p.result}</p>
              {p.clients && (
                <p className="text-accent text-xs font-medium mt-2">
                  {p.clients.map((client, i) => (
                    <span key={client.name}>
                      {i > 0 && " · "}
                      <a href={client.href} className="hover:underline">
                        {client.name}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mb-10 grid grid-cols-12 gap-6 cv-avoid-break">
        <h2 className="col-span-3 font-label-mono text-accent uppercase tracking-widest text-[11px]">
          {t("sections.stack")}
        </h2>
        <div className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-5">
          {stack.map((cat) => (
            <div key={cat.name}>
              <h4 className="font-label-mono text-[10px] uppercase tracking-widest text-secondary mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {cat.name}
              </h4>
              <p className="text-sm">{cat.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Educación */}
      <section className="mb-10 grid grid-cols-12 gap-6 cv-avoid-break">
        <h2 className="col-span-3 font-label-mono text-accent uppercase tracking-widest text-[11px]">
          {t("sections.education")}
        </h2>
        <div className="col-span-9 space-y-3">
          {education.map((edu) => (
            <div key={edu.institution}>
              <div className="flex flex-col md:flex-row md:justify-between mb-1">
                <h3 className="text-sm font-bold">{edu.institution}</h3>
                <span className="font-label-mono text-secondary text-[10px]">{edu.period}</span>
              </div>
              <p className="text-accent text-xs font-medium mb-1.5">{edu.degree}</p>
              <span className="inline-block px-2 py-0.5 bg-surface-alt border border-subtle font-label-mono text-[9px] uppercase tracking-wide text-secondary">
                {t("educationCompletedLabel")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Cursos y Certificaciones */}
      <section className="mb-10 grid grid-cols-12 gap-6 cv-avoid-break">
        <h2 className="col-span-3 font-label-mono text-accent uppercase tracking-widest text-[11px]">
          {t("sections.certifications")}
        </h2>
        <div className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-3">
          {certifications.map((cert) => (
            <div key={cert.title}>
              <p className="text-sm font-bold">{cert.title}</p>
              <p className="text-accent text-xs font-medium">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Idiomas */}
      <section className="grid grid-cols-12 gap-6 cv-avoid-break">
        <h2 className="col-span-3 font-label-mono text-accent uppercase tracking-widest text-[11px]">
          {t("sections.languages")}
        </h2>
        <div className="col-span-9 flex flex-wrap gap-x-10 gap-y-3">
          {languages.map((lang) => (
            <div key={lang.name}>
              <span className="text-sm font-medium">{lang.name}</span>
              <span className="text-secondary text-sm"> — {lang.level}</span>
            </div>
          ))}
        </div>
      </section>

      <PrintButton label={t("printButton")} />
    </main>
  );
}
