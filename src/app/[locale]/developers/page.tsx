"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { partnersQueryOptions } from "@/queries";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Developers = () => {
  const t = useTranslations();
  const {
    data: partnersData,
    isError,
    isLoading,
  } = useQuery(partnersQueryOptions());

  if (isError) return null;
  const partners = partnersData?.data || [];

  return (
    <main className="bg-main-50 min-h-screen">
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
          <h1 className="section-title">{t("Developers")}</h1>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 container pb-20 -mt-[9svh]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-muted animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : partners.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          {t("No developers found")}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 container pb-20 -mt-[9svh]">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group relative aspect-square overflow-hidden bg-white border border-border/50 rounded-xl p-6 transition-all hover:shadow-lg hover:border-primary/20 flex items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                width={200}
                height={200}
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium text-center truncate">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Developers;
