import type { Metadata } from "next";
import { defaultLocale, localizedPath, type Locale } from "@/i18n/config";

export function pageMetadata({
  title,
  description,
  path,
  locale,
  ogAlt,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  ogAlt: string;
}): Metadata {
  const url = localizedPath(locale, path);
  // URL explícita: la convención opengraph-image generaría /es/..., que redirige.
  const image = { url: `/og/${locale}.png`, width: 1200, height: 630, alt: ogAlt };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: localizedPath("es", path),
        en: localizedPath("en", path),
        "x-default": localizedPath(defaultLocale, path),
      },
    },
    openGraph: {
      type: "website",
      url,
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
