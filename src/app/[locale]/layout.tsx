import type { Metadata } from "next";
import localFont from "next/font/local";
import MainLayout from "@/layouts/main-layout";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Providers from "@/components/Providers";

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
      weight: "100 900", // Acumin Variable Concept is a variable font
      style: "normal",
    },
  ],
  variable: "--font-acumin",
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
    <html suppressHydrationWarning lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${handicrafts.variable} ${acumin.variable} font-acumin antialiased`}
      >
        {/* <NextIntlClientProvider> */}
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
