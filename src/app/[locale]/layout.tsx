import type { Metadata } from "next";
import MainLayout from "@/layouts/main-layout";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import Providers from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

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

const geDinarTwo = localFont({
  src: [
    {
      path: "../fonts/ge-dinar-two/GE-Dinar Two Medium_1E.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ge-dinar-two",
});

export const metadata: Metadata = {
  title: "همة",
  description: "",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  // Validate locale
  if (!locales.includes(locale as any)) {
    return notFound();
  }
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <body
        className={cn(
          "antialiased font-ge-dinar-two",
          handicrafts.variable,
          acumin.variable,
          geDinarTwo.variable,
          cairo.variable,
        )}
        dir={locale === "ar" ? "rtl" : "ltr"}
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
