"use client";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectsQueryOptions } from "@/queries";
import ProjectCard from "../projects/project-card";

const LatestProjectsSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "ar" | "en";
  const { data: projectsData } = useSuspenseQuery(
    projectsQueryOptions({ latest: true }),
  );
  const projects = projectsData?.data || [];
  return (
    <section className="min-h-[90svh] bg-main-50 relative overflow-hidden">
      <img
        src="/section-bg-caramel.svg"
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
              <h2 className="section-title">{t("Latest Projects")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex" dir="ltr">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[65svh]">
            {projects?.map((project) => (
              <CarouselItem
                key={project.id}
                className="basis-[85%] lg:basis-[60%] 2xl:basis-[50%] min-h-fit"
              >
                <ProjectCard project={project} />
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

export default LatestProjectsSection;
