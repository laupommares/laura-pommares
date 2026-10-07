import { getImageProps } from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import DeviceFrame from "./DeviceFrame";
import { getProjects } from "@/data/projects";
import type { Locale } from "@/i18n/config";

// Solo se descarga desde 1280 px; debajo el mockup está oculto y queda el GIF vacío.
const DESKTOP = "(min-width: 1280px)";
const BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

function DesktopOnlyImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  className: string;
}) {
  const {
    props: { srcSet, sizes: imgSizes, ...rest },
  } = getImageProps({ src, alt, fill: true, sizes });

  return (
    <picture>
      <source media={DESKTOP} srcSet={srcSet} sizes={imgSizes} />
      <img {...rest} src={BLANK} alt={alt} loading="eager" fetchPriority="high" className={className} />
    </picture>
  );
}

export default async function HeroMockup() {
  const t = await getTranslations("Hero");
  const locale = (await getLocale()) as Locale;
  const unda = getProjects(locale).cases.find((c) => c.slug === "unda");
  if (!unda?.showcase) return null;
  const { laptop, phone } = unda.showcase;

  return (
    <a href="#unda" aria-label={t("mockupLink")} className="group block">
      <div className="transition-transform duration-300 group-hover:-translate-y-1">
        <DeviceFrame
          laptop={
            <DesktopOnlyImage
              src={laptop.src}
              alt={t("mockupAlt")}
              sizes="420px"
              className="object-cover object-left-top"
            />
          }
          phone={
            phone && {
              aspectRatio: `${phone.width} / ${phone.height}`,
              image: (
                <DesktopOnlyImage src={phone.src} alt="" sizes="90px" className="object-cover object-top" />
              ),
            }
          }
        />
      </div>
      <p className="mt-4 font-label-mono text-[11px] uppercase tracking-widest text-secondary group-hover:text-accent transition-colors">
        {t("mockupCaption")}
      </p>
    </a>
  );
}
