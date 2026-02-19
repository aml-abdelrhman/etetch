import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { citiesQueryOptions } from "@/queries";
import RegisterInterestForm from "@/components/pages/register-interest/register-interest-form";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("Register your interest"),
    description: t(
      "Register your interest in our upcoming projects and be the first to know when they launch",
    ),
  };
}

const RegisterInterestPage = async () => {
  const t = await getTranslations();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(citiesQueryOptions());

  return (
    <section className="bg-main-50 min-h-screen pb-[7svh]">
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
          <h1 className="section-title">{t("Register your interest")}</h1>
          <p className="max-w-2xl mx-auto">
            {t(
              "Register your interest in our upcoming projects and be the first to know when they launch",
            )}
          </p>
        </div>
      </div>

      <div className="container pb-20 -mt-[9svh]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <RegisterInterestForm />
        </HydrationBoundary>
      </div>
    </section>
  );
};

export default RegisterInterestPage;
