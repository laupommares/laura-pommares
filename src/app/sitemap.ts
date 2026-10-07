import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/contact";
import { localizedPath, locales } from "@/i18n/config";

const pages = [
  { path: "/", priority: 1 },
  { path: "/cv", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: SITE_URL + localizedPath(locale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: locale === "es" ? priority : priority - 0.1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, SITE_URL + localizedPath(l, path)]),
        ),
      },
    })),
  );
}
