// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import MainLayout from "@/layouts/main-layout";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import Providers from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const handicrafts = localFont({
  src: [
    {
      path: "../fonts/ArbFonts.com-(2)/ArbFONTS-TheYearofHandicrafts-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ArbFonts.com-(2)/ArbFONTS-TheYearofHandicrafts-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-handicrafts",
});

const acumin = localFont({
  src: [
    {
      path: "../fonts/AcuminVariableConcept.otf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-acumin",
});

// Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await params).locale;
  return {
    title: t("ETech"),
  description: t("ETech_learning_platform"),
    openGraph: {
      title: t("ETech"),
description: t("ETech_learning_platform"),
      type: "website",
      siteName: "ETech",
      locale: locale,
    },
    twitter: {
      title: t("ETech"),
description: t("ETech_learning_platform"),
      card: "summary_large_image",
      site: "@ETech",
      creator: "@ETech",
    },
    keywords: [
      "ETech",
      "education",
      "learning",
      "online courses",
      "teachers",
      "students",
    ],
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [{ url: "/llogo.png", href: "/llogo.png" }],
    },
  };
}

// Static params
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// RootLayout
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  if (!locales.includes(locale as any)) {
    return notFound();
  }

  // خطوط عربية وإنجليزية معرفة هنا مباشرة
  const fontArabic = "'Almarai', sans-serif";
  const fontEnglish = "'Baloo 2', cursive";

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Google Fonts - Almarai + Baloo 2 */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;500;700&family=Baloo+2:wght@400;500;600;700&display=swap"
        />
      </head>
      <body
        style={{
          fontFamily: locale === "ar" ? fontArabic : fontEnglish,
        }}
        className={cn(
          "antialiased",
          handicrafts.variable,
          acumin.variable
        )}
      >
        <NextIntlClientProvider locale={locale}>
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}