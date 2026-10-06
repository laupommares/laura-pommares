import type { Metadata } from "next";

// Shared Open Graph / Twitter fields. A page that sets `openGraph` replaces the
// parent's object entirely (it isn't merged), so every page builds the full set
// here instead of relying on the layout's.
export function pageMetadata({
  title,
  description,
  path,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
}): Metadata {
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Laura Pommarés — Full Stack Developer · Next.js & UX/UI",
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: "Laura Pommarés",
      title,
      description,
      locale: locale === "en" ? "en_US" : "es_AR",
      alternateLocale: locale === "en" ? ["es_AR"] : ["en_US"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
