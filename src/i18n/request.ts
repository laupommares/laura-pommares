import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { COOKIE_NAME, defaultLocale, locales, type Locale } from "./config";

export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieLocale = store.get(COOKIE_NAME)?.value;
  const locale: Locale = locales.includes(cookieLocale as Locale)
    ? (cookieLocale as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
