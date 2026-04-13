import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// 1. i18n middleware
const intlMiddleware = createMiddleware(routing);

// Helper: استخراج locale
function getLocale(pathname: string) {
  const segments = pathname.split("/");
  return segments[1] || "en";
}

// 2. Auth middleware logic
function authMiddleware(req: NextRequest) {
  const session = (req as any).auth;
  const isLoggedIn = !!session;
  const userRole = session?.user?.role as string;

  const pathname = req.nextUrl.pathname;
  const locale = getLocale(pathname);

  const authRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"];
  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));
  const isDashboardRoute = pathname.includes("/dashboard");

  const loginUrl = `/${locale}/auth/login`;

  // 🔥 لو logged in و داخل auth pages → روح dashboard
  if (isAuthRoute && isLoggedIn) {
    const rolePath =
      userRole === "admin"
        ? "admin"
        : userRole === "teacher"
        ? "teacher"
        : "student";

    return NextResponse.redirect(
      new URL(`/${locale}/dashboard/${rolePath}`, req.nextUrl.origin)
    );
  }

  // 🔥 لو مش logged in و داخل dashboard → login
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(loginUrl, req.nextUrl.origin));
  }

  // 🔥 /dashboard → redirect حسب role
  if (pathname.endsWith("/dashboard")) {
    const rolePath =
      userRole === "admin"
        ? "admin"
        : userRole === "teacher"
        ? "teacher"
        : "student";

    return NextResponse.redirect(
      new URL(`/${locale}/dashboard/${rolePath}`, req.nextUrl.origin)
    );
  }

  // 🔥 RBAC حماية admin
  if (pathname.includes("/dashboard/admin") && userRole !== "admin") {
    return NextResponse.redirect(
      new URL(`/${locale}/dashboard/student`, req.nextUrl.origin)
    );
  }

  // 🔥 RBAC حماية teacher
  if (pathname.includes("/dashboard/teacher") && userRole !== "teacher") {
    return NextResponse.redirect(
      new URL(`/${locale}/dashboard/student`, req.nextUrl.origin)
    );
  }

  return NextResponse.next();
}

// 3. Combined middleware
export default auth((req) => {
  const authResponse = authMiddleware(req as NextRequest);

  // لو فيه redirect رجعه
  if (authResponse.status !== 200) {
    return authResponse;
  }

  // i18n middleware
  return intlMiddleware(req);
});

// 4. matcher
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)",
    "/",
    "/(ar|en)/:path*",
  ],
};