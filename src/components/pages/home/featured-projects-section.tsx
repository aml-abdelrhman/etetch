"use client";
import { CarouselApi } from "@/components/ui/carousel";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectsQueryOptions } from "@/queries";

const FeaturedProjectsSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "ar" | "en";
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0); // Track current slide
  const [count, setCount] = useState(0);

  const { data: projectsData } = useSuspenseQuery(
    projectsQueryOptions({ featured: true }),
  );

  const projects = projectsData?.data || [];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <section className="min-h-[80svh] bg-main-200 relative overflow-hidden">
      <div className="container py-[17svh] relative z-10 10 max-w-[1620px]">
        <img
          src="/section-bg-dark-caramel.svg"
          alt="Section Background"
          className="absolute bottom-0 start-0 z-5 pointer-events-none"
        />
        <div className="grid lg:grid-cols-2 gap-7 lg:gap-5 relative z-10">
          <Carousel
            opts={{
              direction: locale === "ar" ? "rtl" : "ltr",
            }}
            setApi={setApi}
            className="gap-3 lg:gap-5 order-2 lg:order-1 w-full max-w-full h-full"
          >
            <div className="flex items-center justify-between mb-[7svh]">
              <div className="flex items-center gap-3 max-sm:flex-col">
                <img
                  src="/section-logo.svg"
                  alt="Section Logo"
                  className="pointer-events-none"
                />
                <h2 className="section-title">{t("Featured projects")}</h2>
              </div>
              <p className="text-primary/50 font-inter">
                {count > 0 ? `${current}/${count}` : "0/0"}
              </p>
            </div>
            <CarouselContent className="w-full">
              {projects.map((project) => (
                <CarouselItem key={project.id} className="basis-full">
                  <div className="grid lg:grid-cols-2 gap-3 lg:gap-5 xl:gap-10 w-full text-primary">
                    <div className="space-y-2">
                      <Image
                        src={project.gallery?.[0] || "/featured-projects.svg"}
                        alt={project.title[locale]}
                        width={500}
                        height={500}
                        className="block w-full h-auto rounded-xl"
                      />
                      <p className="text-lg font-thin">
                        {project.title[locale]}
                      </p>
                    </div>
                    <div className="space-y-5">
                      <h3 className="text-3xl lg:text-4xl 2xl:text-5xl font-medium leading-13">
                        {project.title[locale]}
                      </h3>
                      <p className="text-lg font-thin">
                        {project.description[locale]}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="items-center gap-3 hidden md:flex justify-end" dir="ltr">
              <CarouselPrevious className="static size-15 translate-y-0" />
              <CarouselNext className="static size-15 translate-y-0" />
            </div>
          </Carousel>
          <Image
            src="/featured-projects-bg.svg"
            alt="Near To"
            width={500}
            height={500}
            className="block w-full h-auto order-1 lg:order-2 rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
