import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import PersonJsonLd from "@/components/PersonJsonLd";
import { SITE_URL } from "@/data/contact";
import { pageMetadata } from "@/data/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// The locale comes from a cookie, so crawlers and link previews always get Spanish;
// visitors who switched to English get the English title and description.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata({
      title: t("title"),
      description: t("description"),
      path: "/",
      locale: await getLocale(),
    }),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const tMeta = await getTranslations("Meta");

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-background text-primary antialiased selection:bg-accent/10 selection:text-accent">
        <PersonJsonLd description={tMeta("description")} />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
