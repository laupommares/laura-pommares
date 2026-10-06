import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import LandingVideo from "./LandingVideo";
import {
  getProjects,
  type ResolvedCase,
  type ResolvedImage,
  type ResolvedLanding,
} from "@/data/projects";
import { mailtoUrl, whatsappUrl } from "@/data/contact";
import type { Locale } from "@/i18n/config";

type CaseLabels = {
  need: string;
  whatIDid: string;
  role: string;
  stack: string;
  result: string;
  viewProduct: string;
};

type ConfidentialLabels = {
  badge: string;
  cta: string;
  emailCta: string;
  emailSubject: (title: string) => string;
};

const objectPositionClass = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const;

function ProjectImage({ image, badge }: { image: ResolvedImage; badge?: string }) {
  return (
    <div className="relative aspect-15/10 bg-surface-alt overflow-hidden border border-subtle">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`object-cover ${objectPositionClass[image.objectPosition]}`}
      />
      {badge && (
        <span className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 max-[390px]:max-w-[calc(100%-1.5rem)] min-[390px]:whitespace-nowrap bg-background/90 backdrop-blur-sm border border-subtle px-2 sm:px-2.5 py-1 font-label-mono text-[10px] uppercase tracking-wide sm:tracking-widest text-secondary">
          <span className="material-symbols-outlined text-[14px]! leading-none" aria-hidden="true">
            lock
          </span>
          {badge}
        </span>
      )}
    </div>
  );
}

// Light browser chrome around a screenshot, with the product's URL in the bar.
function BrowserFrame({ host, image, sizes }: { host: string; image: ResolvedImage; sizes: string }) {
  return (
    <div className="border border-subtle bg-background overflow-hidden">
      <div className="h-6 bg-surface-alt border-b border-subtle flex items-center px-2.5 gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/15" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/15" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/15" />
        <span className="ml-2 flex-1 max-w-40 truncate rounded-sm bg-background border border-subtle px-2 font-label-mono text-[9px] leading-3.5 text-secondary">
          {host}
        </span>
      </div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="w-full h-auto"
      />
    </div>
  );
}

// Laptop with the main screen and, from sm up, a phone overlapping its corner.
function DeviceShowcase({ showcase }: { showcase: NonNullable<ResolvedCase["showcase"]> }) {
  const { laptop, phone } = showcase;

  return (
    <div className="relative pb-[6%]">
      <div className="mx-[5%] rounded-t-xl bg-neutral-900 p-[1.4%] pb-[1.8%] shadow-xl">
        <div className="relative aspect-16/9 overflow-hidden rounded-[3px] bg-surface-alt">
          <Image
            src={laptop.src}
            alt={laptop.alt}
            fill
            sizes="(min-width: 768px) 55vw, 90vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>
      <div className="relative h-2.5 sm:h-3.5 rounded-b-xl bg-linear-to-b from-neutral-300 to-neutral-400 shadow-md">
        <div className="absolute left-1/2 top-0 h-1/2 w-[14%] -translate-x-1/2 rounded-b-md bg-neutral-400" />
      </div>
      {phone && (
        <div className="hidden sm:block absolute right-0 bottom-0 w-[20%]">
          <div className="rounded-[1.4rem] lg:rounded-[1.75rem] bg-neutral-900 p-[5%] shadow-2xl ring-1 ring-black/10">
            <div
              className="relative overflow-hidden rounded-[1rem] lg:rounded-[1.3rem] bg-surface-alt"
              style={{ aspectRatio: `${phone.width} / ${phone.height}` }}
            >
              <Image
                src={phone.src}
                alt={phone.alt}
                fill
                sizes="(min-width: 768px) 12vw, 20vw"
                className="object-cover object-top"
              />
              <span className="absolute left-1/2 top-[2.5%] h-[3.5%] w-[30%] -translate-x-1/2 rounded-full bg-neutral-900" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectGallery({ images, host }: { images: ResolvedImage[]; host?: string }) {
  const columns = images.length % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  const sizes = images.length % 3 === 0 ? "(min-width: 640px) 33vw, 100vw" : "(min-width: 640px) 50vw, 100vw";

  return (
    <div className={`grid grid-cols-1 ${columns} gap-6 reveal`}>
      {images.map((image) => (
        <figure key={image.src}>
          {host && image.width && image.height ? (
            <BrowserFrame host={host} image={image} sizes={sizes} />
          ) : (
            <ProjectImage image={image} />
          )}
          {image.caption && (
            <figcaption className="text-secondary text-xs leading-relaxed mt-3">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function ProjectContent({
  project,
  num,
  labels,
}: {
  project: ResolvedCase;
  num: string;
  labels: CaseLabels;
}) {
  return (
    <>
      <span className="font-label-mono text-secondary uppercase mb-4 block">
        {num} / {project.category}
      </span>
      <h4 className="font-headline text-headline-md mb-4">{project.title}</h4>
      <ul className="flex flex-wrap gap-1.5 mb-6">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="text-[10px] uppercase tracking-wide font-mono px-2 py-0.5 border border-subtle text-secondary"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="space-y-6">
        {project.need && (
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-widest mb-2">
              {labels.need}
            </h5>
            <p className="text-secondary text-sm leading-relaxed">
              {project.need}
            </p>
          </div>
        )}
        {project.whatIDid.length > 0 && (
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-widest mb-2">
              {labels.whatIDid}
            </h5>
            <ul className="text-secondary text-sm leading-relaxed list-disc pl-4 space-y-1">
              {project.whatIDid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 border-y border-subtle py-5">
          {project.role && (
            <div>
              <h5 className="text-[11px] font-bold uppercase tracking-widest mb-1">
                {labels.role}
              </h5>
              <p className="text-sm">{project.role}</p>
            </div>
          )}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-widest mb-1">
              {labels.stack}
            </h5>
            <p className="text-sm">{project.stack.join(" · ")}</p>
          </div>
        </div>
        {project.result && (
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
              {labels.result}
            </h5>
            <p className="text-primary font-medium text-sm">{project.result}</p>
          </div>
        )}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            {labels.viewProduct}
          </a>
        )}
      </div>
    </>
  );
}

function ConfidentialNotice({
  title,
  confidential: { notice, contactMessage },
  labels,
}: {
  title: string;
  confidential: NonNullable<ResolvedCase["confidential"]>;
  labels: ConfidentialLabels;
}) {

  return (
    <aside className="border border-subtle border-l-2 border-l-accent bg-surface-alt p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 reveal">
      <div className="flex gap-4 flex-1">
        <span className="material-symbols-outlined text-accent shrink-0" aria-hidden="true">
          verified_user
        </span>
        <p className="text-sm leading-relaxed text-primary">{notice}</p>
      </div>
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-3 sm:gap-5 shrink-0">
        <a
          href={whatsappUrl(contactMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
        >
          {labels.cta}
        </a>
        <a
          href={mailtoUrl({ subject: labels.emailSubject(title), body: contactMessage })}
          className="text-sm text-secondary underline underline-offset-4 decoration-subtle hover:text-accent hover:decoration-accent transition-colors"
        >
          {labels.emailCta}
        </a>
      </div>
    </aside>
  );
}

function LandingCard({ landing, viewSite }: { landing: ResolvedLanding; viewSite: string }) {
  const cover = landing.images[0];

  return (
    <article className="group flex flex-col border border-subtle bg-surface-alt overflow-hidden hover:border-accent/40 transition-colors duration-300">
      {/* Browser mockup */}
      <div className={`relative bg-linear-to-br ${landing.theme.gradient} overflow-hidden`}>
        {/* Browser chrome */}
        <div className="h-7 bg-black/40 flex items-center px-3 gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span
            className="ml-2 flex-1 h-3 rounded-sm bg-white/10 max-w-30"
          />
        </div>
        {/* Viewport: same aspect as the landing videos (1280×620), so they show uncropped */}
        <div className="relative aspect-[1280/620]">
          {landing.video ? (
            <LandingVideo
              src={landing.video.src}
              poster={landing.video.poster}
              label={cover.alt}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover.src}
              alt={cover.alt}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          )}
        </div>
        {/* Accent line at bottom */}
        <div
          className="absolute bottom-0 inset-x-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: landing.theme.accent }}
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
          {landing.subtitle && (
            <p className="text-secondary text-xs mt-0.5">{landing.subtitle}</p>
          )}
          {landing.result && (
            <p className="flex gap-2 text-sm font-medium text-primary mt-3">
              <span className="text-accent" aria-hidden="true">—</span>
              {landing.result}
            </p>
          )}
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
          {landing.url && (
            <a
              href={landing.url}
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
  const locale = (await getLocale()) as Locale;
  const { cases, landings } = getProjects(locale);
  const labels: CaseLabels = {
    need: t("labels.need"),
    whatIDid: t("labels.whatIDid"),
    role: t("labels.role"),
    stack: t("labels.stack"),
    result: t("labels.result"),
    viewProduct: t("viewProduct"),
  };
  const confidentialLabels: ConfidentialLabels = {
    badge: t("confidential.badge"),
    cta: t("confidential.cta"),
    emailCta: t("confidential.emailCta"),
    emailSubject: (title) => t("confidential.emailSubject", { title }),
  };
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
        {cases.map((project, i) => {
          const num = String(i + 1).padStart(2, "0");
          const [cover, ...rest] = project.images;
          // With a device showcase as the main visual, every image goes to the gallery.
          const gallery = project.showcase ? project.images : rest;
          const visual = project.showcase ? (
            <DeviceShowcase showcase={project.showcase} />
          ) : (
            <ProjectImage image={cover} badge={project.confidential && confidentialLabels.badge} />
          );
          // Featured cases (with a showcase) give the visual more room and stay
          // stacked, visual on top, until lg; regular cases split at md.
          const layout = project.showcase
            ? {
                visual: "md:col-span-12 lg:col-span-7",
                content: "md:col-span-12 lg:col-span-5",
                visualSecond: "order-1 lg:order-2",
                contentFirst: "order-2 lg:order-1",
              }
            : {
                visual: "md:col-span-6",
                content: "md:col-span-6",
                visualSecond: "order-1 md:order-2",
                contentFirst: "order-2 md:order-1",
              };
          // Cases alternate sides: image left on odd rows, right on even rows.
          const imageFirst = i % 2 === 0;

          return (
            <div key={project.slug} id={project.slug} className="space-y-10 md:space-y-12 scroll-mt-24">
              <article className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center reveal">
                {imageFirst ? (
                  <>
                    <div className={layout.visual}>{visual}</div>
                    <div className={layout.content}>
                      <ProjectContent project={project} num={num} labels={labels} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`${layout.content} ${layout.contentFirst}`}>
                      <ProjectContent project={project} num={num} labels={labels} />
                    </div>
                    <div className={`${layout.visual} ${layout.visualSecond}`}>{visual}</div>
                  </>
                )}
              </article>
              {gallery.length > 0 && (
                <ProjectGallery
                  images={gallery}
                  host={project.url && new URL(project.url).host}
                />
              )}
              {project.confidential && (
                <ConfidentialNotice
                  title={project.title}
                  confidential={project.confidential}
                  labels={confidentialLabels}
                />
              )}
            </div>
          );
        })}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {landings.map((landing) => (
            <LandingCard key={landing.slug} landing={landing} viewSite={viewSite} />
          ))}
        </div>
      </div>
    </section>
  );
}
