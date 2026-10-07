import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* opciones de configuración */
  reactCompiler: true,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
