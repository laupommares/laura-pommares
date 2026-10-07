import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LanguageHint from "@/components/LanguageHint";
import PersonJsonLd from "@/components/PersonJsonLd";
import { SITE_URL } from "@/data/contact";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const tMeta = await getTranslations("Meta");

  return (
    <html lang={locale} className={`${geistSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-primary antialiased selection:bg-accent/10 selection:text-accent">
        <PersonJsonLd description={tMeta("description")} />
        <NextIntlClientProvider>
          {children}
          {locale === routing.defaultLocale && <LanguageHint />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
