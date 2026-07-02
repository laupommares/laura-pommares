import "./print.css";
import PrintButton from "./PrintButton";

const contact = [
  { label: "Email", value: "laurapommares@gmail.com", href: "mailto:laurapommares@gmail.com" },
  { label: "WhatsApp", value: "+54 9 2346 507655", href: "https://wa.me/5492346507655" },
  { label: "Ubicación", value: "Buenos Aires, ARG" },
  { label: "Portfolio", value: "laura-pommares.vercel.app", href: "https://laura-pommares.vercel.app/" },
  { label: "LinkedIn", value: "linkedin.com/in/laura-pommarés", href: "https://www.linkedin.com/in/laura-pommar%C3%A9s-40959127b/" },
  { label: "GitHub", value: "github.com/laupommares", href: "https://github.com/laupommares" },
];

const roles = [
  {
    title: "Frontend Developer",
    company: "SOCIALNET",
    period: "Mayo 2024 — Junio 2026",
    description:
      "Desarrollo y mantenimiento de interfaces web para sistemas internos utilizando Laravel. Participación en la implementación de componentes reutilizables, mejoras de UX/UI y optimización de la accesibilidad siguiendo buenas prácticas de desarrollo frontend. Colaboración en la evolución de la experiencia de usuario, el SEO técnico y el diseño de interfaces.",
    skills: ["Laravel", "JavaScript", "Tailwind CSS", "Bootstrap", "Sass", "Livewire", "Diseño UI/UX", "Accesibilidad", "Figma", "Claude Code"],
  },
  {
    title: "Frontend Developer & UX/UI Designer (Freelance)",
    company: "Independiente",
    period: "Enero 2025 — Presente",
    description:
      "Diseño y desarrollo de interfaces web para proyectos freelance, incluyendo un portal de gestión de estudios médicos para clínicas y landings enfocadas en conversión. Trabajo completo de frontend, UX/UI e integración con APIs backend.",
    skills: ["Next.js", "React", "Laravel", "Tailwind CSS", "JavaScript", "TypeScript", "Figma", "Claude Code"],
  },
];

const stack = [
  { name: "Frontend", items: ["React / Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Alpine.js"] },
  { name: "Backend", items: ["Laravel / PHP", "Livewire", "MySQL"] },
  { name: "Diseño / UX", items: ["Figma", "Design Systems", "WCAG / Accesibilidad", "Photoshop"] },
  { name: "Herramientas", items: ["Git / GitHub", "Jira", "Vercel", "Docker", "Claude Code"] },
];

const languages = [
  { name: "Español", level: "Nativo" },
  { name: "Portugués", level: "Avanzado" },
  { name: "Inglés", level: "B1" },
];

const projects = [
  {
    title: "Plataforma para Gestión de Estudios Médicos",
    role: "Lead Developer — Laravel · Livewire · Tailwind CSS",
    result: "Optimización del flujo de asignación, carga e informe de estudios entre clínica y médicos.",
  },
  {
    title: "Plataforma de Gestión de Turnos Médicos",
    role: "UX/UI & Frontend — Next.js · Figma",
    result: "Sistema de turnos con lógica multi-rol para clínica, médicos, pacientes y empresas.",
  },
  {
    title: "Landings de conversión",
    role: "Sofía Capuano · Juliana Re · Jori Armonía Yoga",
    result: "Portfolios y sitios de reserva para profesionales independientes, con foco en identidad y conversión.",
  },
];

export default function CvPage() {
  return (
    <main className="cv-page bg-background text-primary max-w-[800px] mx-auto px-margin-mobile py-16 print:py-0">
      <a
        href="/"
        className="cv-no-print inline-block mb-8 font-label-mono text-[11px] uppercase tracking-widest text-secondary hover:text-accent"
      >
        ← Volver al sitio
      </a>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-subtle cv-avoid-break">
        <h1 className="font-headline text-headline-lg mb-2">Laura Pommarés</h1>
        <p className="font-headline text-headline-md text-secondary mb-6">
          Frontend Developer <span className="text-accent italic">& UX/UI Designer</span>
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
          Perfil
        </h2>
        <div className="col-span-9 space-y-3">
          <p className="text-secondary text-sm leading-relaxed">
            Desarrollo interfaces web modernas, accesibles y mantenibles, transformando diseños en
            experiencias claras, rápidas y fáciles de usar.
          </p>
          <p className="text-secondary text-sm leading-relaxed">
            Mi enfoque combina desarrollo frontend y UX/UI para crear productos donde el diseño, la
            accesibilidad y el código trabajan en conjunto.
          </p>
          <p className="text-secondary text-sm leading-relaxed">
            Trabajo principalmente con React, Next.js y Laravel, siempre buscando construir soluciones
            escalables y centradas en las necesidades de las personas que las utilizan.
          </p>
        </div>
      </section>

      {/* Experiencia */}
      <section className="mb-10 grid grid-cols-12 gap-6">
        <h2 className="col-span-3 font-label-mono text-accent uppercase tracking-widest text-[11px]">
          Experiencia
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
          Proyectos
        </h2>
        <div className="col-span-9 space-y-5">
          {projects.map((p) => (
            <div key={p.title} className="cv-avoid-break">
              <h3 className="text-sm font-bold">{p.title}</h3>
              <p className="font-label-mono text-secondary text-[10px] uppercase tracking-wide mb-1">
                {p.role}
              </p>
              <p className="text-secondary text-sm leading-relaxed">{p.result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mb-10 grid grid-cols-12 gap-6 cv-avoid-break">
        <h2 className="col-span-3 font-label-mono text-accent uppercase tracking-widest text-[11px]">
          Stack
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

      {/* Idiomas */}
      <section className="grid grid-cols-12 gap-6 cv-avoid-break">
        <h2 className="col-span-3 font-label-mono text-accent uppercase tracking-widest text-[11px]">
          Idiomas
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

      <PrintButton />
    </main>
  );
}
