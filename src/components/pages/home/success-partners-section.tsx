"use client";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";

const partners = [
  "/partner-1.svg",
  "/partner-2.svg",
  "/partner-3.svg",
  "/partner-1.svg",
  "/partner-2.svg",
  "/partner-3.svg",
  "/partner-2.svg",
  "/partner-1.svg",
];

const SuccessPartnersSection = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <section className="min-h-[90svh] bg-background relative overflow-hidden">
      <img
        src="/section-bg-white.svg"
        alt="Section Background"
        className="absolute top-0 start-0 z-5 pointer-events-none"
      />
      <div className="py-[17svh] relative z-10">
        <Carousel
          opts={{
            align: "center",
            direction: locale === "ar" ? "rtl" : "ltr",
          }}
          plugins={[
            Autoplay({
              delay: 2700,
            }),
          ]}
          className="w-full"
        >
          <div className="flex items-center sm:justify-between gap-5 max-sm:flex-col flex-wrap mb-[9svh] container">
            <div className="flex items-center gap-3 max-sm:flex-col">
              <img
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
              />
              <h2 className="section-title">{t("Success Partners")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex z-20 relative">
              <CarouselNext className="static text-black border-black size-15 translate-y-0" />
              <CarouselPrevious className="static text-black border-black size-15 translate-y-0" />
            </div>
          </div>
          <div className="absolute start-0 h-full w-[11svw] z-12 bg-linear-to-l from-white via-white/90 to-transparent pointer-events-none" />
          <div className="absolute end-0 h-full w-[11svw] z-12 bg-linear-to-r from-white via-white/90 to-transparent pointer-events-none" />
          <CarouselContent className="min-h-[11svh] relative">
            {partners.map((src, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/7"
              >
                <div className="relative size-43 overflow-hidden">
                  <Image
                    src={src}
                    alt={`Partner Image`}
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center gap-3 justify-center md:hidden mt-9">
            <CarouselNext className="static translate-y-0" />
            <CarouselPrevious className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default SuccessPartnersSection;
