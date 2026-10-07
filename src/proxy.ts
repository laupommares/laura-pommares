import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Las rutas con extensión (PDFs, imágenes, OG) no pasan por el proxy.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
