const landings = [
  {
    id: "L1",
    category: "Fine Art Photography",
    title: "Sofía Capuano",
    subtitle: "Fine Art Photographer",
    description:
      "Portfolio bilingüe para fotógrafa especializada en bodas, sesiones de playa y retratos íntimos. Diseño minimalista con foco en la luz natural y la emoción.",
    stack: ["Next.js", "Tailwind CSS", "Figma"],
    gradient: "from-stone-900 via-amber-950 to-stone-800",
    accentColor: "#d4a96a",
    lines: ["portfolio", "sobre mí", "proceso", "contacto"],
    href: "https://sofiacapuanoph.vercel.app/",
  },
  {
    id: "L2",
    category: "Nutrición & Coaching",
    title: "Juliana Re",
    subtitle: "Nutricionista & Coach Ontológica",
    description:
      "Landing para nutricionista con enfoque en alimentación consciente e intuitiva. Programas 1:1, retiros grupales y acompañamiento familiar.",
    stack: ["Next.js", "Figma"],
    gradient: "from-emerald-950 via-teal-900 to-teal-800",
    accentColor: "#6ee7b7",
    lines: ["enfoque", "programas", "quién acompaña", "consulta"],
    href: "https://julianare.vercel.app/",
  },
  {
    id: "L3",
    category: "Yoga & Bienestar",
    title: "Jori Armonía Yoga",
    subtitle: "Jorgelina Cantone — Instructora de Yoga",
    description:
      "Sitio de reserva de clases para instructora de Yoga Terapéutico, Ashtanga Vinyasa y Prenatal. Diseño orgánico centrado en calma y bienestar.",
    stack: ["Next.js", "Figma"],
    gradient: "from-stone-800 via-amber-900 to-yellow-950",
    accentColor: "#d4a96a",
    lines: ["filosofía", "clases", "propuestas", "reservar"],
    href: "https://joriarmoniayoga.com/",
  },
];

const projects = [
  {
    num: "01",
    category: "Frontend Development with Backend Support",
    title: "Plataforma para Gestión de Estudios Médicos",
    challengeLabel: "Problema",
    challenge:
      "Desarrollo de funcionalidades para una plataforma web utilizada por profesionales de la salud para registrar, consultar y gestionar estudios médicos de pacientes en un entorno seguro y centralizado.",
    col1Label: "Rol",
    col1Value: "Lead Developer",
    col2Label: "Stack",
    col2Value: "Laravel · Livewire · Tailwind CSS · JavaScript · Alpine.js",
    resultLabel: "Resultado",
    result:
      "Optimización del flujo de asignación, carga e informe de estudios entre clínica y médicos.",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5HuI3X0N2vHoxhiqL90gFwLFeiDUnlS-pQ09nCHWKl93jg_YpIWvuou8SVplXCC4A8bDhkpF406PFENqfA1TLNxtqMxiUUa1_XwpIYUiy5g3zrAzCBprmJgmphJ20VkU72867q_qN-J946ifTlGElPvjETWhvsJAgsCTL7VrOcHvWiDmVmM28laCmkTXlFkR8I8lpvm_u4rOWBbbrRIwZE5BQq25P4kTDUqLNIt2FoOrTEFBSMre7y4ZG_bTbIGavl67O9eT4QA",
      alt: "Portal Nutricionista",
    },
    imageFirst: true,
  },
  {
    num: "02",
    category: "UX/UI & Frontend Development",
    title: "Plataforma de Gestión de Turnos Médicos",
    challengeLabel: "El Desafío",
    challenge:
      "Diseñar un sistema de gestión de turnos que permita coordinar la asignación, reserva e información de estudios entre distintos perfiles: clínica, médicos, pacientes y empresas, manteniendo claridad y rapidez en el flujo.",
    col1Label: "Proceso",
    col1Value: "Design Systems & Prototyping",
    col2Label: "Tecnologías",
    col2Value: "Next.js & Figma",
    resultLabel: "Solución",
    result:
      "Diseño de un sistema de turnos con lógica multi-rol, donde cada usuario accede a flujos específicos según su función, optimizando la asignación y seguimiento de estudios clínicos.",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLxJ6Md8F1J3qj3hbTK27JNhuLnJelli3le7EylRRE0QysDXV_825sSOo6bN8-Dp8ktv4pF9Bex_fIAQsxIxcEaYA7adGKJkZZUsmnO7PgLAiJflqr1CSPTCmT23OzZsnRT7w3koqlnZEeWii4G0UUXnVKqj6hWYCBoS5Ctk6NlLe08BHmzTt-dLQL74MaXM3955u9_F7zto2efB6iCHwfMT--gm_EK5aJrJpHpYNt_53mpBRmedV6dFhpHEGbuDIot8Q_wyYUA",
      alt: "Marketplace Servicios",
    },
    imageFirst: false,
  },
];

type Project = (typeof projects)[number];

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-16/10 bg-surface-alt overflow-hidden border border-subtle">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover case-study-img"
      />
    </div>
  );
}

function ProjectContent({ project }: { project: Project }) {
  return (
    <>
      <span className="font-label-mono text-secondary uppercase mb-4 block">
        {project.num} / {project.category}
      </span>
      <h4 className="font-headline text-headline-md mb-6">{project.title}</h4>
      <div className="space-y-8">
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-widest mb-2">
            {project.challengeLabel}
          </h5>
          <p className="text-secondary text-sm leading-relaxed">
            {project.challenge}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-y border-subtle py-6">
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-widest mb-1">
              {project.col1Label}
            </h5>
            <p className="text-sm">{project.col1Value}</p>
          </div>
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-widest mb-1">
              {project.col2Label}
            </h5>
            <p className="text-sm">{project.col2Value}</p>
          </div>
        </div>
        <div>
          <h5 className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
            {project.resultLabel}
          </h5>
          <p className="text-primary font-medium text-sm">{project.result}</p>
        </div>
      </div>
    </>
  );
}

function LandingCard({ landing }: { landing: (typeof landings)[number] }) {
  return (
    <article className="group flex flex-col border border-subtle bg-surface-alt overflow-hidden hover:border-accent/40 transition-colors duration-300">
      {/* Browser mockup */}
      <div className={`relative bg-linear-to-br ${landing.gradient} aspect-4/3 overflow-hidden`}>
        {/* Browser chrome */}
        <div className="absolute inset-x-0 top-0 h-7 bg-black/40 backdrop-blur-sm flex items-center px-3 gap-1.5 z-10">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span
            className="ml-2 flex-1 h-3 rounded-sm bg-white/10 max-w-30"
          />
        </div>
        {/* Simulated UI content */}
        <div className="absolute inset-0 pt-10 px-5 pb-5 flex flex-col gap-3">
          {/* Hero headline simulation */}
          <div className="mt-2 space-y-1.5">
            <div className="h-2 rounded-sm bg-white/70 w-3/4" />
            <div className="h-2 rounded-sm bg-white/40 w-1/2" />
          </div>
          {/* Nav simulation */}
          <div className="flex gap-2 mt-1">
            {landing.lines.map((label) => (
              <span
                key={label}
                className="h-1.5 rounded-sm bg-white/25"
                style={{ width: `${label.length * 7}px` }}
              />
            ))}
          </div>
          {/* CTA button simulation */}
          <div
            className="mt-2 h-6 w-24 rounded-sm"
            style={{ backgroundColor: `${landing.accentColor}55` }}
          />
          {/* Image placeholder blocks */}
          <div className="flex-1 mt-2 grid grid-cols-3 gap-2">
            <div className="rounded-sm bg-white/10 col-span-2" />
            <div className="flex flex-col gap-2">
              <div className="rounded-sm bg-white/10 flex-1" />
              <div className="rounded-sm bg-white/10 flex-1" />
            </div>
          </div>
        </div>
        {/* Accent line at bottom */}
        <div
          className="absolute bottom-0 inset-x-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: landing.accentColor }}
        />
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary">
          {landing.category}
        </span>
        <div>
          <h4 className="font-headline text-headline-sm leading-tight">
            {landing.title}
          </h4>
          <p className="text-secondary text-xs mt-0.5">{landing.subtitle}</p>
        </div>
        <p className="text-secondary text-sm leading-relaxed flex-1">
          {landing.description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-subtle">
          <div className="flex flex-wrap gap-1.5">
            {landing.stack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] uppercase tracking-wide font-mono px-2 py-0.5 border border-subtle text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
          {landing.href && (
            <a
              href={landing.href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 ml-3 font-label-mono text-[10px] uppercase tracking-widest text-accent hover:underline"
            >
              Ver sitio →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section
      className="px-margin-mobile max-w-container-max mx-auto mb-section-gap"
      id="proyectos"
    >
      <div className="mb-20 reveal">
        <h2 className="font-label-mono text-accent uppercase tracking-widest mb-4">
          Proyectos Destacados
        </h2>
        <h3 className="font-headline text-headline-lg">
          Work & Case Studies
        </h3>
      </div>
      <div className="space-y-40">
        {projects.map((project) => (
          <article
            key={project.num}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start reveal"
          >
            {project.imageFirst ? (
              <>
                <div className="md:col-span-7">
                  <ProjectImage
                    src={project.image.src}
                    alt={project.image.alt}
                  />
                </div>
                <div className="md:col-span-5 pt-4">
                  <ProjectContent project={project} />
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-5 pt-4 order-2 md:order-1">
                  <ProjectContent project={project} />
                </div>
                <div className="md:col-span-7 order-1 md:order-2">
                  <ProjectImage
                    src={project.image.src}
                    alt={project.image.alt}
                  />
                </div>
              </>
            )}
          </article>
        ))}
      </div>

      {/* Landings grid */}
      <div className="mt-40 reveal">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-label-mono text-[11px] uppercase tracking-widest text-secondary block mb-2">
              También
            </span>
            <h3 className="font-headline text-headline-md">
              Landings & One-Pagers
            </h3>
          </div>
          <p className="text-secondary text-sm max-w-xs leading-relaxed">
            Sitios rápidos, con identidad clara y enfoque en conversión para
            profesionales independientes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {landings.map((landing) => (
            <LandingCard key={landing.id} landing={landing} />
          ))}
        </div>
      </div>
    </section>
  );
}
