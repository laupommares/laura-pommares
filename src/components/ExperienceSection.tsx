import { getTranslations } from "next-intl/server";
import LinkedText from "./LinkedText";

type RoleItem = {
  title: string;
  company?: string;
  context?: string;
  contextUrl?: string;
  period: string;
  bullets: string[];
  skills: string[];
};

export default async function ExperienceSection() {
  const t = await getTranslations("Experience");
  const roles = t.raw("roles") as RoleItem[];

  return (
    <section
      className="px-margin-mobile max-w-container-max mx-auto mb-16 md:mb-section-gap reveal"
      id="experiencia"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <h2 className="font-label-mono text-accent uppercase tracking-widest">
            {t("heading")}
          </h2>
        </div>
        <div className="md:col-span-8 space-y-16">
          {roles.map((role) => (
            <div key={role.title}>
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                  {role.company && (
                    <p className="text-accent text-sm font-medium">{role.company}</p>
                  )}
                  {role.context && (
                    <p className="text-secondary text-xs mt-1">
                      <LinkedText
                        text={role.context}
                        url={role.contextUrl}
                        className="underline underline-offset-2 hover:text-accent"
                      />
                    </p>
                  )}
                </div>
                <span className="font-label-mono text-secondary text-[12px] mt-2 md:mt-0 md:ml-6 shrink-0 whitespace-nowrap">
                  {role.period}
                </span>
              </div>
              <ul className="text-secondary text-sm leading-relaxed mb-6 max-w-2xl list-disc pl-4 space-y-2">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-surface-alt border border-subtle font-label-mono text-[9px] uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
