import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/data/contact";

// Sin teléfono a propósito, para que no lo recolecten bots.
export default function PersonJsonLd({ description }: { description: string }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Laura Pommarés",
    jobTitle: "Full Stack Developer",
    description,
    url: SITE_URL,
    email: `mailto:${EMAIL}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chivilcoy",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    sameAs: [LINKEDIN_URL, GITHUB_URL],
    worksFor: {
      "@type": "Organization",
      name: "ula studio",
      url: "https://somosulastudio.com",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad Nacional de Quilmes",
    },
    knowsLanguage: ["es", "pt", "en"],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "REST API",
      "Prisma",
      "PostgreSQL",
      "MySQL",
      "Laravel",
      "Tailwind CSS",
      "UX/UI Design",
      "Figma",
      "Web Accessibility (WCAG)",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
    />
  );
}
