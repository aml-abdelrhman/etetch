import createMiddleware from 'next-intl/middleware';
import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";
import { routing } from './i18n/routing';

// 1. إعداد ميدل وير اللغات
const intlMiddleware = createMiddleware(routing);

// 2. إعداد منطق التحقق من الصلاحيات (Auth Middleware)
function authMiddleware(req: NextRequest) {
  // الحصول على بيانات الجلسة
  const session = (req as any).auth;
  const isLoggedIn = !!session;
  const userRole = session?.user?.role as string;
  
  const pathname = req.nextUrl.pathname;
  
  // تحديد المسارات الخاصة بتسجيل الدخول
  const authRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"];
  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));
  const isDashboardRoute = pathname.includes("/dashboard");

  // - إذا كان المستخدم مسجل دخول ويحاول دخول صفحات Auth، حوله للداشبورد الخاص به
  if (isAuthRoute && isLoggedIn) {
    const rolePath = userRole === "admin" ? "admin" : userRole === "teacher" ? "teacher" : "student";
    return NextResponse.redirect(new URL(`/dashboard/${rolePath}`, req.nextUrl.origin));
  }

  // - إذا كان غير مسجل دخول ويحاول دخول الداشبورد، حوله لصفحة اللوجن
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl.origin));
  }

  // - توجيه /dashboard (بدون سلاش بعدها) إلى الداشبورد المختص
  if (pathname.endsWith("/dashboard")) {
    const rolePath = userRole === "admin" ? "admin" : userRole === "teacher" ? "teacher" : "student";
    return NextResponse.redirect(new URL(`/dashboard/${rolePath}`, req.nextUrl.origin));
  }

  // - نظام التحكم بالصلاحيات (RBAC)
  if (pathname.includes("/dashboard/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/student", req.nextUrl.origin));
  }

  if (pathname.includes("/dashboard/teacher") && userRole !== "teacher") {
    return NextResponse.redirect(new URL("/dashboard/student", req.nextUrl.origin));
  }

  return NextResponse.next();
}

// 3. الميدل وير المدمج (Combined Middleware)
export default auth((req) => {
  // أولاً: تنفيذ فحص الصلاحيات
  const authResponse = authMiddleware(req as NextRequest);
  
  // إذا أرجع فحص الصلاحيات "توجيه" (Redirect)، نفذه فوراً
  if (authResponse.status !== 200) {
    return authResponse;
  }

  // ثانياً: تطبيق ميدل وير اللغات
  return intlMiddleware(req);
});

// 4. الإعدادات الهامة (Matcher)
export const config = {
  matcher: [
    // السماح بكل المسارات ما عدا ملفات النظام والـ API والصور
    // تم تحسين الـ Regex لضمان عدم استبعاد صفحات مثل /teachers
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)',
    
    // تأكيد تفعيل الميدل وير للمسارات الرئيسية واللغات
    '/', 
    '/(ar|en)/:path*',
  ]
};