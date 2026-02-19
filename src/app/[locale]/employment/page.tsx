import EmploymentForm from "@/components/pages/employment/employment-form";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("Employment"),
    description: t("Join our team and be part of Hemma Real Estate excellence"),
  };
}

const EmploymentPage = async () => {
  const t = await getTranslations();

  return (
    <main className="bg-main-50 min-h-screen pb-[7svh]">
      <div className="bg-main-200 py-[20svh] relative">
        <Image
          src="/section-bg-dark-caramel.svg"
          alt="Section Background"
          className="absolute top-0 start-0 w-fit z-5 pointer-events-none"
          width={898}
          height={459}
        />
        <div className="container flex flex-col items-center text-center gap-5 z-10 relative">
          <Image
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none w-16"
            width={60}
            height={60}
          />
          <h1 className="section-title">{t("Employment")}</h1>
          <p className="max-w-2xl mx-auto">
            {t("Join our team and be part of Hemma Real Estate excellence")}
          </p>
        </div>
      </div>

      <div className="container pb-20 -mt-[9svh]">
        <EmploymentForm />
      </div>
    </main>
  );
};

export default EmploymentPage;
