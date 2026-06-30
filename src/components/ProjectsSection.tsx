const projects = [
  {
    num: "01",
    category: "Full-stack Development",
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
      "Digitalización del 100% de los procesos y mejora del 50% en el tiempo de respuesta a pacientes.",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5HuI3X0N2vHoxhiqL90gFwLFeiDUnlS-pQ09nCHWKl93jg_YpIWvuou8SVplXCC4A8bDhkpF406PFENqfA1TLNxtqMxiUUa1_XwpIYUiy5g3zrAzCBprmJgmphJ20VkU72867q_qN-J946ifTlGElPvjETWhvsJAgsCTL7VrOcHvWiDmVmM28laCmkTXlFkR8I8lpvm_u4rOWBbbrRIwZE5BQq25P4kTDUqLNIt2FoOrTEFBSMre7y4ZG_bTbIGavl67O9eT4QA",
      alt: "Portal Nutricionista",
    },
    imageFirst: true,
  },
  {
    num: "02",
    category: "UX & Frontend Design",
    title: "Marketplace de Servicios para el Hogar",
    challengeLabel: "El Desafío",
    challenge:
      "Crear una interfaz de confianza para una plataforma de mantenimiento que fuese accesible tanto para adultos mayores como para profesionales con poco tiempo.",
    col1Label: "Proceso",
    col1Value: "Design Systems & Prototyping",
    col2Label: "Tecnologías",
    col2Value: "Next.js, Framer Motion, Figma",
    resultLabel: "Solución",
    result:
      "Librería de componentes de alto contraste y navegación intuitiva bajo estándares WCAG.",
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
    <div className="aspect-[16/10] bg-surface-alt overflow-hidden border border-subtle">
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
          Soluciones de Ingeniería
        </h3>
      </div>
      <div className="space-y-[160px]">
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
    </section>
  );
}
