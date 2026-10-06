import type { Locale } from "@/i18n/config";

// Single source for the case studies and landings in ProjectsSection.
// Order in `projects` is the order on the page. UI labels ("La necesidad",
// "Ver sitio →", …) stay in messages/*.json; only content lives here.

export type Localized<T = string> = Record<Locale, T>;
// Anything that reads the same in both languages can be written once.
export type Translatable<T = string> = T | Localized<T>;

// Placeholder for content that hasn't been written yet. It is never rendered.
export const TODO = "TODO";

export type ProjectImage = {
  src: string;
  alt: Translatable;
  caption?: Translatable; // shown only in the gallery, never on the cover
  objectPosition?: "top" | "center" | "bottom";
};

export type ProjectVideo = {
  src: Translatable;
  poster: string;
};

type Bullets =
  | [string, string]
  | [string, string, string]
  | [string, string, string, string];

type BaseProject = {
  slug: string;
  category: Translatable;
  title: Translatable;
  subtitle?: Translatable;
  stack: Translatable<string[]>;
  result: Translatable;
  url?: string;
  images: [ProjectImage, ...ProjectImage[]]; // the first one is the cover
  video?: ProjectVideo;
};

// Private systems can't show real screens: the images are illustrative and the
// case offers a live walkthrough instead (see ConfidentialNotice).
export type Confidential = {
  notice: Translatable;
  contactMessage: Translatable; // prefilled WhatsApp text and email body
};

export type CaseProject = BaseProject & {
  type: "case";
  tags: Translatable<string[]>; // status chips: "En producción", "Multi-rol", …
  need: Translatable;
  whatIDid: Translatable<Bullets>;
  role: Translatable;
  confidential?: Confidential;
};

export type LandingProject = BaseProject & {
  type: "landing";
  description: Translatable;
  theme: { gradient: string; accent: string }; // browser mockup colors
};

export type Project = CaseProject | LandingProject;

export const projects: Project[] = [
  {
    slug: "gestion-estudios-medicos",
    type: "case",
    category: "Frontend Development with Backend Support",
    title: {
      es: "Plataforma para Gestión de Estudios Médicos",
      en: "Medical Studies Management Platform",
    },
    tags: {
      es: ["Cliente real · España", "En producción", "Mantenimiento activo"],
      en: ["Real client · Spain", "In production", "Ongoing maintenance"],
    },
    need: {
      es: "Una clínica en España necesitaba centralizar la asignación, la carga y el informe de los estudios médicos de sus pacientes entre el equipo de la clínica y los médicos, en un entorno seguro.",
      en: "A clinic in Spain needed to centralize how patient medical studies are assigned, uploaded and reported between clinic staff and doctors, in a secure environment.",
    },
    whatIDid: {
      es: [
        "Me encargué del frontend completo: interfaces en Laravel, Livewire y Alpine.js, con componentes reutilizables en Tailwind CSS.",
        "Trabajé en equipo con un desarrollador backend y participé también en la base de datos y en la lógica del servidor.",
        "Rediseñé el flujo de asignación, carga e informe de estudios entre la clínica y los médicos.",
        "Sigo a cargo del mantenimiento y de las mejoras, en contacto directo con el cliente.",
      ],
      en: [
        "Owned the entire frontend: Laravel, Livewire and Alpine.js interfaces with reusable Tailwind CSS components.",
        "Worked alongside a backend developer and also contributed to the database and server-side logic.",
        "Redesigned the assignment, upload and reporting flow between the clinic and doctors.",
        "Still responsible for maintenance and improvements, working directly with the client.",
      ],
    },
    role: "Frontend Developer · Backend support",
    stack: ["Laravel", "Livewire", "Tailwind CSS", "JavaScript", "Alpine.js"],
    result: {
      es: "En producción desde mayo de 2025, con el mantenimiento contratado desde entonces: más de un año de trabajo continuo.",
      en: "In production since May 2025, with maintenance under contract ever since: over a year of continuous work.",
    },
    confidential: {
      notice: {
        es: "Por tratarse de un sistema privado con datos de pacientes, las imágenes son ilustrativas. Si te interesa, te muestro un recorrido en vivo por la plataforma real en una entrevista.",
        en: "Because this is a private system handling patient data, the images are illustrative. If you're interested, I can walk you through the real platform live during an interview.",
      },
      contactMessage: {
        es: "Hola Laura, vi tu portfolio y me interesa ver el recorrido de la plataforma de estudios médicos.",
        en: "Hi Laura, I saw your portfolio and I'd like to see the walkthrough of the medical studies platform.",
      },
    },
    images: [
      {
        src: "/projects/gestion-estudios-medicos/cover.jpeg",
        alt: {
          es: "Portal para Gestión de Estudios Médicos",
          en: "Medical Studies Management Portal",
        },
        objectPosition: "top",
      },
    ],
  },
  {
    slug: "gestion-turnos-medicos",
    type: "case",
    category: "UX/UI & Frontend Development",
    title: {
      es: "Plataforma de Gestión de Turnos Médicos",
      en: "Medical Appointment Management Platform",
    },
    tags: {
      es: ["En desarrollo", "Multi-rol"],
      en: ["In development", "Multi-role"],
    },
    need: {
      es: "Coordinar turnos y estudios entre cuatro perfiles con necesidades distintas (clínica, médicos, pacientes y empresas) sin perder claridad ni velocidad.",
      en: "Coordinate appointments and studies across four profiles with different needs (clinic, doctors, patients and companies) without losing clarity or speed.",
    },
    whatIDid: {
      es: [
        "Diseñé en Figma los flujos por rol, con design system y prototipos navegables.",
        "Desarrollé el frontend en Next.js y TypeScript, consumiendo APIs REST.",
        "Resolví la integración con route handlers propios, sesión en cookies httpOnly y renovación automática de tokens.",
      ],
      en: [
        "Designed role-based flows in Figma, with a design system and interactive prototypes.",
        "Built the frontend with Next.js and TypeScript, consuming REST APIs.",
        "Handled the API integration through custom route handlers, httpOnly cookie sessions and automatic token refresh.",
      ],
    },
    role: "UX/UI Designer & Frontend Developer",
    stack: {
      es: ["Next.js", "TypeScript", "Consumo de APIs REST", "Auth con JWT", "Figma"],
      en: ["Next.js", "TypeScript", "REST API Consumption", "JWT Auth", "Figma"],
    },
    result: {
      es: "Arquitectura de roles y autenticación resuelta; cada perfil entra directo a su flujo. Próxima etapa en desarrollo.",
      en: "Role architecture and authentication in place; each profile lands directly in its own flow. Next phase in development.",
    },
    images: [
      {
        src: "/projects/gestion-turnos-medicos/cover.jpeg",
        alt: {
          es: "Plataforma de Gestión de Turnos Médicos",
          en: "Medical Appointment Management Platform",
        },
        objectPosition: "top",
      },
    ],
  },
  {
    slug: "jori-armonia-yoga",
    type: "landing",
    category: { es: "Yoga & Bienestar", en: "Yoga & Wellness" },
    title: "Jori Armonía Yoga",
    subtitle: {
      es: "Jorgelina Cantone — Instructora de Yoga",
      en: "Jorgelina Cantone — Yoga Instructor",
    },
    description: {
      es: "Sitio de reserva de clases para instructora de Yoga Terapéutico, Ashtanga Vinyasa y Prenatal. Diseño orgánico centrado en calma y bienestar.",
      en: "Class booking site for a Therapeutic Yoga, Ashtanga Vinyasa, and Prenatal Yoga instructor. Organic design centered on calm and wellbeing.",
    },
    result: {
      es: "Se reserva la clase en un clic, por WhatsApp.",
      en: "Book a class in one click, via WhatsApp.",
    },
    stack: ["Next.js", "Figma"],
    url: "https://joriarmoniayoga.com/",
    images: [
      { src: "/projects/jori-armonia-yoga/poster.jpg", alt: "Jori Armonía Yoga landing" },
    ],
    video: {
      src: "/projects/jori-armonia-yoga/video.mp4",
      poster: "/projects/jori-armonia-yoga/poster.jpg",
    },
    theme: { gradient: "from-[#31332c] via-[#4a4b27] to-[#696b33]", accent: "#696b33" },
  },
  {
    slug: "las-coquettes",
    type: "landing",
    category: { es: "Espectáculos & Eventos", en: "Shows & Events" },
    title: "Las Coquettes",
    subtitle: "Jazz Girls Club — Barcelona",
    description: {
      es: "Sitio para una compañía de shows de jazz, teatro y glamour en Barcelona. Repertorio, servicios a medida y reservas para hoteles, galas y eventos privados.",
      en: "Site for a jazz, theatre, and glamour show company based in Barcelona. Repertoire, tailored services, and bookings for hotels, galas, and private events.",
    },
    result: {
      es: "Del espectáculo a la reserva, en una página.",
      en: "From the show to the booking, on one page.",
    },
    stack: ["Next.js", "Tailwind CSS", "Figma"],
    url: "https://www.lascoquettes.com/",
    images: [{ src: "/projects/las-coquettes/poster.jpg", alt: "Las Coquettes landing" }],
    video: {
      src: "/projects/las-coquettes/video.mp4",
      poster: "/projects/las-coquettes/poster.jpg",
    },
    theme: { gradient: "from-stone-900 via-red-950 to-neutral-900", accent: "#770303" },
  },
  {
    slug: "juliana-re",
    type: "landing",
    category: { es: "Nutrición & Coaching", en: "Nutrition & Coaching" },
    title: "Juliana Re",
    subtitle: {
      es: "Nutricionista & Coach Ontológica",
      en: "Nutritionist & Ontological Coach",
    },
    description: {
      es: "Landing para nutricionista con enfoque en alimentación consciente e intuitiva. Programas 1:1, retiros grupales y acompañamiento familiar.",
      en: "Landing page for a nutritionist focused on mindful, intuitive eating. 1:1 programs, group retreats, and family support.",
    },
    result: {
      es: "Tres programas, una sola consulta.",
      en: "Three programs, one consultation.",
    },
    stack: ["Next.js", "Figma"],
    url: "https://julianareconecta.com/",
    images: [{ src: "/projects/juliana-re/poster.jpg", alt: "Juliana Re landing" }],
    video: {
      src: {
        es: "/projects/juliana-re/video-es.mp4",
        en: "/projects/juliana-re/video-en.mp4",
      },
      poster: "/projects/juliana-re/poster.jpg",
    },
    theme: { gradient: "from-[#2b2819] via-[#4a3b12] to-[#7a5a0e]", accent: "#dfa924" },
  },
  {
    slug: "sofia-capuano",
    type: "landing",
    category: "Fine Art Photography",
    title: "Sofía Capuano",
    subtitle: "Fine Art Photographer",
    description: {
      es: "Portfolio bilingüe para fotógrafa especializada en bodas, sesiones de playa y retratos íntimos. Diseño minimalista con foco en la luz natural y la emoción.",
      en: "Bilingual portfolio for a photographer specializing in weddings, beach sessions, and intimate portraits. Minimalist design focused on natural light and emotion.",
    },
    result: {
      es: "El sitio entero, en español y en inglés.",
      en: "The whole site, in Spanish and English.",
    },
    stack: ["Next.js", "Tailwind CSS", "Figma"],
    url: "https://sofiacapuano.com/",
    images: [{ src: "/projects/sofia-capuano/poster.jpg", alt: "Sofía Capuano landing" }],
    video: {
      src: "/projects/sofia-capuano/video.mp4",
      poster: "/projects/sofia-capuano/poster.jpg",
    },
    theme: { gradient: "from-stone-900 via-amber-950 to-stone-800", accent: "#d4a96a" },
  },
];

// ---------------------------------------------------------------------------
// Locale resolution: components receive plain strings in a single language.

function isLocalized<T>(value: Translatable<T>): value is Localized<T> {
  return (
    typeof value === "object" && value !== null && !Array.isArray(value) && "es" in value
  );
}

function pick<T>(value: Translatable<T>, locale: Locale): T {
  return isLocalized(value) ? value[locale] : value;
}

// TODO placeholders resolve to undefined / are dropped, so they never reach the page.
function text(value: Translatable | undefined, locale: Locale): string | undefined {
  if (value === undefined) return undefined;
  const resolved = pick(value, locale);
  return resolved === TODO ? undefined : resolved;
}

export type ResolvedImage = {
  src: string;
  alt: string;
  caption?: string;
  objectPosition: "top" | "center" | "bottom";
};

type ResolvedBase = {
  slug: string;
  category: string;
  title: string;
  subtitle?: string;
  stack: string[];
  result?: string;
  url?: string;
  images: ResolvedImage[];
  video?: { src: string; poster: string };
};

export type ResolvedCase = ResolvedBase & {
  type: "case";
  tags: string[];
  need?: string;
  whatIDid: string[];
  role?: string;
  confidential?: { notice: string; contactMessage: string };
};

export type ResolvedLanding = ResolvedBase & {
  type: "landing";
  description?: string;
  theme: LandingProject["theme"];
};

function resolveBase(p: Project, locale: Locale): ResolvedBase {
  return {
    slug: p.slug,
    category: pick(p.category, locale),
    title: pick(p.title, locale),
    subtitle: text(p.subtitle, locale),
    stack: pick(p.stack, locale),
    result: text(p.result, locale),
    url: p.url,
    images: p.images.map((img) => ({
      src: img.src,
      alt: pick(img.alt, locale),
      caption: text(img.caption, locale),
      objectPosition: img.objectPosition ?? "center",
    })),
    video: p.video && { src: pick(p.video.src, locale), poster: p.video.poster },
  };
}

export function getProjects(locale: Locale) {
  const cases: ResolvedCase[] = [];
  const landings: ResolvedLanding[] = [];
  for (const p of projects) {
    const base = resolveBase(p, locale);
    if (p.type === "case") {
      cases.push({
        ...base,
        type: "case",
        tags: pick(p.tags, locale),
        need: text(p.need, locale),
        whatIDid: pick(p.whatIDid, locale).filter((b) => b !== TODO),
        role: text(p.role, locale),
        confidential: p.confidential && {
          notice: pick(p.confidential.notice, locale),
          contactMessage: pick(p.confidential.contactMessage, locale),
        },
      });
    } else {
      landings.push({
        ...base,
        type: "landing",
        description: text(p.description, locale),
        theme: p.theme,
      });
    }
  }
  return { cases, landings };
}
