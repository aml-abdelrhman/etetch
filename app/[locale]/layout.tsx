import type { Metadata } from "next";
import localFont from "next/font/local";
import MainLayout from "@/layouts/main-layout";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Providers from "@/components/Providers";

const norsa = localFont({
  src: [
    {
      path: "../fonts/Norsa/alfont_com_Norsal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Norsa/alfont_com_Norsal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Norsa/alfont_com_Norsal-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Norsa/alfont_com_Norsal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-norsa",
});

export const metadata: Metadata = {
  title: "إستاذي",
  description: "تطبيق متخصص في تقديم خدمات إستاذي",
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
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${norsa.variable} font-norsa antialiased`}>
        <NextIntlClientProvider>
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
