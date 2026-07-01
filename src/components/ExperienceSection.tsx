const roles = [
  {
    title: "Frontend Developer",
    company: "SOCIALNET",
    period: "Mayo 2024 — Junio 2026",
    description:
      "Desarrollo de interfaces web en frontend para sistemas internos, con foco en accesibilidad, usabilidad y consumo de APIs. Participación en la construcción de componentes reutilizables e integración con backend.",
    skills: ["Laravel", "JavaScript", "Tailwind CSS", "Bootstrap", "Saas", "Livewire", "Diseño UI/UI", "Accesibilidad", "Figma", "Claude"],
  },
  {
    title: "Frontend Developer & UX/UI Designer (Freelance)",
    company: "Independiente",
    period: "Enero 2025 — Presente",
    description:
      "Diseño y desarrollo de interfaces web para proyectos freelance, incluyendo un portal de gestión de estudios médicos para clínicas y landings enfocadas en conversión. Trabajo completo de frontend, UX/UI e integración con APIs backend.",
    skills: ["Next.js", "React", "Laravel", "Tailwind", "JavaScript", "Figma", "Claude"],
  },
];

export default function ExperienceSection() {
  return (
    <section
      className="px-margin-mobile max-w-container-max mx-auto mb-section-gap reveal"
      id="experiencia"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <h2 className="font-label-mono text-accent uppercase tracking-widest">
            Experiencia Profesional
          </h2>
        </div>
        <div className="md:col-span-8 space-y-16">
          {roles.map((role) => (
            <div key={role.title}>
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                  <p className="text-accent text-sm font-medium">
                    {role.company}
                  </p>
                </div>
                <span className="font-label-mono text-secondary text-[12px] mt-2 md:mt-0">
                  {role.period}
                </span>
              </div>
              <p className="text-secondary text-sm leading-relaxed mb-6 max-w-2xl">
                {role.description}
              </p>
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
