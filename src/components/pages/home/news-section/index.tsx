"use client";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import NewsCard from "./news-card";
import { useQuery } from "@tanstack/react-query";
import { newsQueryOptions } from "@/queries";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NewsSection = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { data, isError } = useQuery(newsQueryOptions({ limit: 4 }));

  if (isError) return null;

  return (
    <section className="min-h-[90svh] bg-main-200 relative overflow-hidden">
      <Image
        src="/section-bg-dark-caramel.svg"
        alt="Section Background"
        className="absolute bottom-0 start-0 z-5 pointer-events-none"
        width={898}
        height={459}
      />
      <div className="py-[17svh] relative z-10 container">
        <Carousel
          opts={{
            align: "center",

            direction: locale === "ar" ? "rtl" : "ltr",
          }}
          className="w-full"
        >
          <div className="flex items-center sm:justify-between gap-5 max-sm:flex-col flex-wrap mb-[7svh]">
            <div className="flex items-center gap-3 max-sm:flex-col">
              <Image
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
                width={60}
                height={60}
              />
              <h2 className="section-title">{t("Hemma News")}</h2>
            </div>
            <div
              className="items-center gap-3 hidden md:flex z-20 relative"
              dir="ltr"
            >
              <CarouselPrevious className="static text-black border-black size-15 translate-y-0" />
              <CarouselNext className="static text-black border-black size-15 translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-fit lg:h-[65svh]">
            {data?.data?.map((item, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  "lg:basis-1/2 2xl:basis-1/3 min-h-fit",
                  data?.data?.length > 1 ? "basis-[85%]" : "basis-full",
                )}
              >
                <NewsCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div
            className="flex items-center gap-3 justify-center md:hidden mt-9"
            dir="ltr"
          >
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default NewsSection;
