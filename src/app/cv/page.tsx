import type { ReactNode } from "react";
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

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 mb-5">
      <h2 className="shrink-0 font-label-mono text-accent-ink uppercase tracking-widest text-[11px]">
        {children}
      </h2>
      <span className="h-px flex-1 bg-subtle" aria-hidden="true" />
    </div>
  );
}

export default async function CvPage() {
  // CV-specific copy: title, contact, section labels, languages, condensed projects.
  const t = await getTranslations("CvPage");
  // Shared content — the CV reads the same keys the site sections use, so there is a
  // single source of truth and editing a site section updates the downloadable CV too.
  const tProfile = await getTranslations("Profile");
  const tExperience = await getTranslations("Experience");
  const tStack = await getTranslations("TechStack");
  const tEducation = await getTranslations("Education");
  const tCertifications = await getTranslations("Certifications");

  const contact = t.raw("contact") as ContactItem[];
  const profileParagraphs = tProfile.raw("paragraphs") as string[];
  const roles = tExperience.raw("roles") as RoleItem[];
  const projects = t.raw("projects") as ProjectItem[];
  const stack = tStack.raw("categories") as StackCategory[];
  const education = tEducation.raw("studies") as EducationItem[];
  const certifications = tCertifications.raw("items") as CertificationItem[];
  const languages = t.raw("languages") as LanguageItem[];

  return (
    <main className="cv-page bg-background text-primary max-w-180 mx-auto px-margin-mobile py-16 print:py-0">
      <a
        href="/"
        className="cv-no-print inline-block mb-8 font-label-mono text-[11px] uppercase tracking-widest text-secondary hover:text-accent"
      >
        {t("backLink")}
      </a>

      {/* Header */}
      <header className="mb-12 pb-8 border-b border-subtle cv-avoid-break">
        <h1 className="font-headline text-headline-lg mb-2">{t("name")}</h1>
        <p className="font-headline text-headline-md text-secondary mb-6">
          {t("titleMain")} <span className="text-accent italic">{t("titleAccent")}</span>
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {contact.map((c) => (
            <div key={c.label} className="pr-6 border-r border-subtle last:border-r-0 last:pr-0">
              <span className="block font-label-mono text-[10px] text-secondary uppercase tracking-widest mb-0.5">
                {c.label}
              </span>
              {c.href ? (
                <a href={c.href} className="text-sm font-medium hover:text-accent">
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
      <section className="mb-12 cv-avoid-break">
        <SectionHeading>{t("sections.profile")}</SectionHeading>
        <div className="space-y-3">
          {profileParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-secondary text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Experiencia */}
      <section className="mb-12">
        <SectionHeading>{t("sections.experience")}</SectionHeading>
        <div className="space-y-8">
          {roles.map((role) => (
            <div key={role.title} className="cv-avoid-break pl-4 border-l-2 border-subtle">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1 gap-x-4">
                <h3 className="text-sm font-bold">{role.title}</h3>
                <span className="font-label-mono text-secondary text-[10px] shrink-0">{role.period}</span>
              </div>
              <p className="text-accent-ink text-xs font-medium mb-2">{role.company}</p>
              <p className="text-secondary text-sm leading-relaxed mb-3">{role.description}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {role.skills.map((skill, i) => (
                  <span key={skill} className="contents">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-secondary text-[9px]">
                        ·
                      </span>
                    )}
                    <span className="px-2 py-0.5 bg-surface-alt border border-subtle font-label-mono text-[9px] uppercase">
                      {skill}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className="mb-12">
        <SectionHeading>{t("sections.projects")}</SectionHeading>
        <div className="space-y-6">
          {projects.map((p) => (
            <div key={p.title} className="cv-avoid-break pl-4 border-l-2 border-subtle">
              <h3 className="text-sm font-bold">{p.title}</h3>
              <p className="font-label-mono text-secondary text-[10px] uppercase tracking-wide mb-1">
                {p.role}
              </p>
              <p className="text-secondary text-sm leading-relaxed">{p.result}</p>
              {p.clients && (
                <p className="text-accent-ink text-xs font-medium mt-2">
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
      <section className="mb-12 cv-avoid-break">
        <SectionHeading>{t("sections.stack")}</SectionHeading>
        <div className="grid sm:grid-cols-2 print:grid-cols-1 gap-x-10 gap-y-5">
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
      <section className="mb-12 cv-avoid-break">
        <SectionHeading>{t("sections.education")}</SectionHeading>
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.institution} className="pl-4 border-l-2 border-subtle">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1 gap-x-4">
                <h3 className="text-sm font-bold">{edu.institution}</h3>
                <span className="font-label-mono text-secondary text-[10px] shrink-0">{edu.period}</span>
              </div>
              <p className="text-accent-ink text-xs font-medium mb-1.5">{edu.degree}</p>
              <span className="inline-block px-2 py-0.5 bg-surface-alt border border-subtle font-label-mono text-[9px] uppercase tracking-wide text-secondary">
                {tEducation("completedLabel")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Cursos y Certificaciones */}
      <section className="mb-12 cv-avoid-break">
        <SectionHeading>{t("sections.certifications")}</SectionHeading>
        <div className="grid sm:grid-cols-2 print:grid-cols-1 gap-x-10 gap-y-3">
          {certifications.map((cert) => (
            <div key={cert.title}>
              <h3 className="text-sm font-bold">{cert.title}</h3>
              <p className="text-accent-ink text-xs font-medium">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Idiomas */}
      <section className="cv-avoid-break">
        <SectionHeading>{t("sections.languages")}</SectionHeading>
        <div className="flex flex-wrap gap-x-10 gap-y-3">
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
