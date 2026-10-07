import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  // Sin redirección por idioma del navegador ni cookie: el idioma lo decide la URL.
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
});
