import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/data/metadata";
import { getProjects } from "@/data/projects";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_URL,
  WHATSAPP_DISPLAY,
  displayUrl,
  whatsappUrl,
} from "@/data/contact";
import type { Locale } from "@/i18n/config";
import "./print.css";
import PrintButton from "./PrintButton";
import LinkedText from "@/components/LinkedText";

// ATS-friendly CV: one column, plain text (no key info inside icons or chips),
// standard section titles, clickable links. Print styles keep it to 2 A4 pages.

type ContactItem = { label: string; value: string; href?: string };
type RoleItem = {
  title: string;
  company?: string;
  context?: string;
  contextUrl?: string;
  period: string;
  bullets: string[];
  skills: string[];
};
type StackCategory = { name: string; items: string[] };
type EducationItem = {
  institution: string;
  degree: string;
  period?: string;
  status: "completed" | "inProgress";
};
type CertificationItem = { title: string; issuer: string };
type LanguageItem = { name: string; level: string };

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 mb-4 print:mb-2">
      <h2 className="shrink-0 font-label-mono text-accent-ink uppercase tracking-widest text-[11px]">
        {children}
      </h2>
      <span className="h-px flex-1 bg-subtle" aria-hidden="true" />
    </div>
  );
}

// Short sections stay on one page; long ones (experience) may break.
function Section({
  title,
  children,
  breakable = false,
}: {
  title: string;
  children: ReactNode;
  breakable?: boolean;
}) {
  return (
    <section className={`mb-10 print:mb-5 ${breakable ? "" : "cv-avoid-break"}`}>
      <SectionHeading>{title}</SectionHeading>
      {children}
    </section>
  );
}

function ContactLine({ items }: { items: ContactItem[] }) {
  return (
    <p className="text-sm print:text-[13px]">
      {items.map((c, i) => (
        <span key={c.label}>
          {i > 0 && <span className="text-secondary"> · </span>}
          {c.href ? (
            <a href={c.href} className="hover:text-accent">
              {c.value}
            </a>
          ) : (
            c.value
          )}
        </span>
      ))}
    </p>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return pageMetadata({
    title: t("cvTitle"),
    description: t("cvDescription"),
    path: "/cv",
    locale: await getLocale(),
  });
}

const body = "text-secondary text-sm print:text-[13px] leading-relaxed print:leading-snug";

export default async function CvPage() {
  // CV-specific copy: title, contact, section labels, languages.
  const t = await getTranslations("CvPage");
  // Shared content — the CV reads the same sources the site uses, so there is a
  // single source of truth and editing the site updates the downloadable CV too.
  const tProfile = await getTranslations("Profile");
  const tExperience = await getTranslations("Experience");
  const tStack = await getTranslations("TechStack");
  const tEducation = await getTranslations("Education");
  const tCertifications = await getTranslations("Certifications");
  const locale = (await getLocale()) as Locale;
  const { cases, landings } = getProjects(locale);

  // Contact data comes from src/data/contact.ts; only the location is translated.
  const contact: ContactItem[] = [
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { label: "WhatsApp", value: WHATSAPP_DISPLAY, href: whatsappUrl() },
    { label: "Location", value: t("location") },
    { label: "Portfolio", value: displayUrl(SITE_URL), href: SITE_URL },
    { label: "LinkedIn", value: displayUrl(LINKEDIN_URL), href: LINKEDIN_URL },
    { label: "GitHub", value: displayUrl(GITHUB_URL), href: GITHUB_URL },
  ];
  const profileParagraphs = tProfile.raw("paragraphs") as string[];
  const roles = tExperience.raw("roles") as RoleItem[];
  const stack = tStack.raw("categories") as StackCategory[];
  const education = tEducation.raw("studies") as EducationItem[];
  const certifications = tCertifications.raw("items") as CertificationItem[];
  const languages = t.raw("languages") as LanguageItem[];

  return (
    <main className="cv-page bg-background text-primary max-w-180 mx-auto px-margin-mobile py-16 print:py-0">
      <Link
        href="/"
        className="cv-no-print inline-block mb-8 font-label-mono text-[11px] uppercase tracking-widest text-secondary hover:text-accent"
      >
        {t("backLink")}
      </Link>

      {/* Header */}
      <header className="mb-10 print:mb-4 pb-6 print:pb-3 border-b border-subtle">
        <h1 className="font-headline text-headline-lg print:text-[28px] print:leading-tight mb-1">
          {t("name")}
        </h1>
        <p className="font-headline text-headline-md print:text-[18px] text-secondary mb-4 print:mb-2">
          {t("titleMain")} <span className="text-accent">{t("titleAccent")}</span>
        </p>
        <ContactLine items={contact.slice(0, 3)} />
        <ContactLine items={contact.slice(3)} />
      </header>

      <Section title={t("sections.profile")}>
        {profileParagraphs.map((paragraph) => (
          <p key={paragraph} className={body}>
            {paragraph}
          </p>
        ))}
      </Section>

      <Section title={t("sections.experience")} breakable>
        <div className="space-y-8 print:space-y-4">
          {roles.map((role) => (
            <div key={role.title}>
              <div className="flex flex-col md:flex-row print:flex-row md:justify-between print:justify-between md:items-baseline print:items-baseline gap-x-4">
                <h3 className="text-sm print:text-[13.5px] font-bold">
                  {role.title}
                  {role.company && ` — ${role.company}`}
                </h3>
                <span className="font-label-mono text-secondary text-[10px] shrink-0">
                  {role.period}
                </span>
              </div>
              {role.context && (
                <p className="text-accent-ink text-xs print:text-[12px] font-medium">
                  <LinkedText text={role.context} url={role.contextUrl} className="underline decoration-accent-ink/30 underline-offset-2 hover:decoration-accent-ink" />
                </p>
              )}
              <ul className={`${body} mt-2 print:mt-1 space-y-1 print:space-y-0.5`}>
                {role.bullets.map((bullet) => (
                  // "•" is real text (not a CSS marker) so it survives plain-text extraction.
                  <li key={bullet} className="pl-3.5 -indent-3.5">
                    •&nbsp;&nbsp;{bullet}
                  </li>
                ))}
              </ul>
              <p className="text-xs print:text-[12px] text-secondary mt-2 print:mt-1">
                <span className="font-medium text-primary">{t("techLabel")}:</span>{" "}
                {role.skills.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("sections.projects")}>
        <div className="space-y-3 print:space-y-1.5">
          {cases.map((p) => (
            <div key={p.slug} className="cv-avoid-break">
              <p className="text-sm print:text-[13px]">
                <span className="font-bold">{p.title}</span>
                <span className="text-secondary"> · {p.tags.join(" · ")}</span>
              </p>
              <p className="text-xs print:text-[12px] text-secondary">
                {p.stack.join(" · ")}
                {p.url && (
                  <>
                    {" — "}
                    <a href={p.url} className="text-accent-ink underline decoration-accent-ink/30 underline-offset-2 hover:decoration-accent-ink">
                      {new URL(p.url).host}
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
          <p className="text-sm print:text-[13px] cv-avoid-break">
            <span className="font-bold">{t("landingsLabel")}</span>
            {" — "}
            {landings.map((l, i) => (
              <span key={l.slug}>
                {i > 0 && " · "}
                <a href={l.url} className="text-accent-ink underline decoration-accent-ink/30 underline-offset-2 hover:decoration-accent-ink">
                  {l.title}
                </a>
              </span>
            ))}
          </p>
        </div>
      </Section>

      <Section title={t("sections.stack")}>
        <div className="space-y-1.5 print:space-y-0.5">
          {stack.map((cat) => (
            <p key={cat.name} className="text-sm print:text-[13px]">
              <span className="font-bold">{cat.name}:</span>{" "}
              <span className="text-secondary">{cat.items.join(" · ")}</span>
            </p>
          ))}
        </div>
      </Section>

      <Section title={t("sections.education")}>
        <div className="space-y-1.5 print:space-y-0.5">
          {education.map((edu) => (
            <div
              key={edu.institution}
              className="flex flex-col md:flex-row print:flex-row md:justify-between print:justify-between md:items-baseline print:items-baseline gap-x-4"
            >
              <p className="text-sm print:text-[13px]">
                <span className="font-bold">{edu.degree}</span>
                <span className="text-secondary">
                  {" — "}
                  {edu.institution}
                  {edu.status === "inProgress" &&
                    ` (${tEducation("inProgressLabel").toLowerCase()})`}
                </span>
              </p>
              {edu.period && (
                <span className="font-label-mono text-secondary text-[10px] shrink-0">
                  {edu.period}
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("sections.certifications")}>
        <ul className="space-y-1 print:space-y-0">
          {certifications.map((cert) => (
            <li key={cert.title} className="text-sm print:text-[13px]">
              <span className="font-bold">{cert.title}</span>
              <span className="text-secondary"> — {cert.issuer}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t("sections.languages")}>
        <p className="text-sm print:text-[13px]">
          {languages.map((lang, i) => (
            <span key={lang.name}>
              {i > 0 && <span className="text-secondary"> · </span>}
              <span className="font-medium">{lang.name}</span>
              <span className="text-secondary"> — {lang.level}</span>
            </span>
          ))}
        </p>
      </Section>

      <PrintButton label={t("printButton")} />
    </main>
  );
}
