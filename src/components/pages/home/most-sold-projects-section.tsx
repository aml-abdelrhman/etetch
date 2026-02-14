"use client";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BedDoubleIcon, MapPinIcon } from "lucide-react";
import { AreaIcon } from "@/icons";
import { Progress } from "@/components/ui/progress";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectsQueryOptions } from "@/queries";

const MostSoldProjectsSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "ar" | "en";

  const { data: projectsData } = useSuspenseQuery(
    projectsQueryOptions({ most_sold: true }),
  );

  const projects = projectsData?.data || [];

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
          className="w-full"
        >
          <div className="flex items-center sm:justify-between gap-5 max-sm:flex-col flex-wrap mb-[7svh] container">
            <div className="flex items-center gap-3 max-sm:flex-col">
              <img
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
              />
              <h2 className="section-title">{t("Most Sold Projects")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex" dir="ltr">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[65svh]">
            {projects.map((project) => (
              <CarouselItem
                key={project.id}
                className="basis-[85%] lg:basis-[60%] 2xl:basis-[50%] min-h-fit"
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="group relative h-full block"
                >
                  <div className="flex items-center gap-3 absolute top-5 start-5 z-10">
                    <Badge
                      variant="secondary"
                      className="text-sm font-medium text-primary/40 flex items-center gap-2"
                    >
                      <MapPinIcon className="size-4! text-primary" />
                      {project.city[locale]}
                    </Badge>
                  </div>
                  <img
                    src={project.gallery?.[0] || "/gallary-section-img.png"}
                    alt={project.title[locale]}
                    className="h-[80%] w-full object-cover rounded-4xl"
                  />
                  <div className="grid lg:grid-cols-2 gap-5 mt-5 text-primary/50 z-10 text-start">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-primary">
                        {project.title[locale]}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="">
                          <span className="text-primary font-inter font-semibold">
                            {80}%{" "}
                          </span>{" "}
                          <span className="text-sm">{t("sold units")}</span>
                        </p>
                        <Progress className="max-w-55" value={80} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <BedDoubleIcon className="size-4 text-primary" />
                        <p className="text-sm">
                          {t("units", { count: project.rooms || 0 })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AreaIcon className="size-4 text-primary" />
                        <p className="text-sm">
                          {project.area}{" "}
                          <span className="text-primary/40 inline-block ms-1">
                            {" "}
                            {t("m")}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm text-primary">
                        {project.price_from}{" "}
                        <span className="text-primary/40 inline-block ms-1">
                          {" "}
                          {t("SAR")}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center gap-3 justify-center md:hidden mt-9" dir="ltr">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default MostSoldProjectsSection;
