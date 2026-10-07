export type Locale = "es" | "en";

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

export function localizedPath(locale: Locale, path: string) {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
