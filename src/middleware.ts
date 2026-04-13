import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// فقط i18n بدون أي auth
export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)",
    "/",
    "/(ar|en)/:path*",
  ],
};