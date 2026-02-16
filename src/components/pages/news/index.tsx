"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { newsQueryOptions } from "@/queries";
import NewsCard from "./news-card";
import { useTranslations } from "next-intl";
import EmptyState from "@/components/EmptyState";

const NewsList = () => {
  const t = useTranslations();
  const { data } = useSuspenseQuery(newsQueryOptions({}));

  return (
    <section className="bg-white min-h-screen">
      <div className="bg-main-200 py-[20svh] relative">
        <img
          src="/section-bg-dark-caramel.svg"
          alt="Section Background"
          className="absolute top-0 start-0 z-5 pointer-events-none"
        />
        <div className="container flex flex-col items-center text-center gap-5">
          <img
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none w-16"
          />
          <h1 className="section-title">{t("Hemma News")}</h1>
          <p className="text-cyan-950/60 max-w-2xl mx-auto">
            {t(
              "Discover the latest news and updates from Hemma Real Estate Development",
            )}
          </p>
        </div>
      </div>

      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {data?.data?.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        {data?.data?.length === 0 && (
          <EmptyState title={t("No news found")} />
        )}
      </div>
    </section>
  );
};

export default NewsList;
