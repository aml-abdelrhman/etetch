import { NextResponse } from "next/server";
import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Cache for performance optimization
const PROTECTED_ROUTES = new Set([
    'profile',
]);

// Public routes that should never require authentication
const PUBLIC_ROUTES = new Set([
    '',
]);


export default auth((req) => {
    try {
        const handleI18nRouting = createMiddleware(routing);
        const response = handleI18nRouting(req);
        const pathname = req.nextUrl.pathname;
        const session = req.auth;

        // Skip auth checks for static files and API routes
        if (pathname.startsWith('/api/') ||
            pathname.startsWith('/_next/') ||
            pathname.includes('.')) {
            return response;
        }

        // Extract locale from the pathname
        const defaultLocale = routing.defaultLocale;
        const locales = routing.locales;

        // Determine the current locale from the path or use default
        const locale = locales.find((loc) => pathname.startsWith(`/${loc}`)) || defaultLocale;
        // Extract the route after locale more robustly
        const pathWithoutLocale = pathname.replace(new RegExp(`^/(${locales.join('|')})`), '') || '/';
        const routeSegments = pathWithoutLocale.split('/').filter(Boolean);
        const firstRouteSegment = routeSegments[0] || '';
        // Check if current path is a home page
        const isHomePage = pathname === '/' ||
            pathname === `/${locale}` ||
            locales.some(loc => pathname === `/${loc}`) ||
            pathWithoutLocale === '/' ||
            pathWithoutLocale === '';

        // Check if route is explicitly public
        const isPublicRoute = PUBLIC_ROUTES.has(firstRouteSegment);

        // Check if this is an auth route (to prevent redirect loops)
        const isAuthRoute = firstRouteSegment === 'auth' || pathname.includes('/auth/');

        // Check if route requires authentication
        const isProtectedRoute = !isHomePage && !isPublicRoute && !isAuthRoute && PROTECTED_ROUTES.has(firstRouteSegment);
        
        // Handle unauthenticated users
        if (!session) {
            // Redirect to login if trying to access protected routes without auth
            // But prevent infinite loops by checking if we're not already on login page
            if (isProtectedRoute && !pathname.includes('/auth/login')) {
                const redirectPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;
                return NextResponse.redirect(new URL(`/${locale}/auth/login?redirect=${encodeURIComponent(redirectPath)}`, req.url));
            }
        }

        // Handle authenticated users
        if (session) {
            // Redirect authenticated users away from auth pages (except logout)
            if (isAuthRoute && !pathname.includes('/auth/logout')) {
                const redirectParam = req.nextUrl.searchParams.get('redirect');
                const redirectUrl = redirectParam ? `/${locale}${redirectParam}` : `/${locale}`;
                return NextResponse.redirect(new URL(redirectUrl, req.url));
            }
        }

        // Continue with i18n routing for all other cases
        return response;
    } catch (error) {
        // Log error and continue with basic i18n routing as fallback
        console.error('Middleware error:', error);
        const handleI18nRouting = createMiddleware(routing);
        return handleI18nRouting(req);
    }
})

export const config = {
    // Match only internationalized pathnames
    matcher: [
        "/",
        "/(ar|en)/:path*",
        // Exclude API routes, static files, and Next.js internals
        "/((?!api|_next/static|_next/image|favicon.ico|images|manifest.json).*)",
    ],
};