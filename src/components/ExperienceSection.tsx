const roles = [
  {
    title: "Desarrolladora Frontend Senior & UX Engineer",
    company: "Freelance / Independiente",
    period: "Enero 2021 — Presente",
    description:
      "Arquitectura de interfaces centradas en accesibilidad para clientes internacionales. Desarrollo de librerías de componentes modulares en React y optimización de Core Web Vitals, logrando mejoras del 30% en performance.",
    skills: ["React", "Laravel", "Tailwind", "Livewire"],
  },
  {
    title: "Frontend Web Developer",
    company: "Agencias Digitales",
    period: "Marzo 2018 — Dic 2020",
    description:
      "Implementación de diseños pixel-perfect desde Figma a código productivo. Colaboración en la definición de tokens de diseño y mantenimiento de flujos de despliegue continuo (CI/CD).",
    skills: ["Vue.js", "JavaScript", "SASS", "WordPress"],
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
