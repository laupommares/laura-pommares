import { getTranslations } from "next-intl/server";

type ProjectItem = {
  num: string;
  category: string;
  title: string;
  challengeLabel: string;
  challenge: string;
  col1Label: string;
  col1Value: string;
  col2Label: string;
  col2Value: string;
  resultLabel: string;
  result: string;
  image: { src: string; alt: string; objectPositionClassName: string };
  imageFirst: boolean;
};

type LandingItem = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  gradient: string;
  accentColor: string;
  lines: string[];
  href: string;
  image: string;
};

function ProjectImage({
  src,
  alt,
  objectPositionClassName = "object-center",
}: {
  src: string;
  alt: string;
  objectPositionClassName?: string;
}) {
  return (
    <div className="aspect-16/10 bg-surface-alt overflow-hidden border border-subtle">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${objectPositionClassName}`}
      />
    </div>
  );
}

function ProjectContent({ project }: { project: ProjectItem }) {
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

function LandingCard({ landing, viewSite }: { landing: LandingItem; viewSite: string }) {
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
        {/* Content: real screenshot or simulated UI */}
        {landing.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={landing.image}
            alt={`${landing.title} landing`}
            className="absolute inset-0 w-full h-full object-cover object-top pt-7"
          />
        ) : (
          <div className="absolute inset-0 pt-10 px-5 pb-5 flex flex-col gap-3">
            <div className="mt-2 space-y-1.5">
              <div className="h-2 rounded-sm bg-white/70 w-3/4" />
              <div className="h-2 rounded-sm bg-white/40 w-1/2" />
            </div>
            <div className="flex gap-2 mt-1">
              {landing.lines.map((label) => (
                <span
                  key={label}
                  className="h-1.5 rounded-sm bg-white/25"
                  style={{ width: `${label.length * 7}px` }}
                />
              ))}
            </div>
            <div
              className="mt-2 h-6 w-24 rounded-sm"
              style={{ backgroundColor: `${landing.accentColor}55` }}
            />
            <div className="flex-1 mt-2 grid grid-cols-3 gap-2">
              <div className="rounded-sm bg-white/10 col-span-2" />
              <div className="flex flex-col gap-2">
                <div className="rounded-sm bg-white/10 flex-1" />
                <div className="rounded-sm bg-white/10 flex-1" />
              </div>
            </div>
          </div>
        )}
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
              {viewSite}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function ProjectsSection() {
  const t = await getTranslations("Projects");
  const projects = t.raw("items") as ProjectItem[];
  const landings = t.raw("landings") as LandingItem[];
  const viewSite = t("viewSite");

  return (
    <section
      className="px-margin-mobile max-w-container-max mx-auto mb-16 md:mb-section-gap"
      id="proyectos"
    >
      <div className="mb-12 md:mb-20 reveal">
        <h2 className="font-label-mono text-accent uppercase tracking-widest mb-4">
          {t("heading")}
        </h2>
        <h3 className="font-headline text-headline-lg">
          {t("subheading")}
        </h3>
      </div>
      <div className="space-y-16 md:space-y-30">
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
                    objectPositionClassName={project.image.objectPositionClassName}
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
                    objectPositionClassName={project.image.objectPositionClassName}
                  />
                </div>
              </>
            )}
          </article>
        ))}
      </div>

      {/* Landings grid */}
      <div className="mt-20 md:mt-40 reveal">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-label-mono text-[11px] uppercase tracking-widest text-secondary block mb-2">
              {t("landingsLabel")}
            </span>
            <h3 className="font-headline text-headline-md">
              {t("landingsHeading")}
            </h3>
          </div>
          <p className="text-secondary text-sm max-w-xs leading-relaxed">
            {t("landingsDescription")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {landings.map((landing) => (
            <LandingCard key={landing.id} landing={landing} viewSite={viewSite} />
          ))}
        </div>
      </div>
    </section>
  );
}
