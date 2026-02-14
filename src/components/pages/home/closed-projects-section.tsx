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
import Link from "next/link";

const ClosedProjectsSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "ar" | "en";

  const { data: projectsData } = useSuspenseQuery(
    projectsQueryOptions({ status: "sold" }),
  );

  const projects = projectsData?.data || [];

  return (
    <section className="min-h-[90svh] bg-main-50 relative overflow-hidden">
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
              <img
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
              />
              <h2 className="section-title">{t("We closed the door")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex" dir="ltr">
              <CarouselPrevious className="static text-black border-black size-15 translate-y-0" />
              <CarouselNext className="static text-black border-black size-15 translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[65svh]">
            {projects.map((project) => (
              <CarouselItem
                key={project.id}
                className="basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="group relative h-full overflow-hidden rounded-4xl block"
                >
                  <img
                    src={project.gallery?.[0] || "/Link.svg"}
                    alt={project.title[locale]}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-lg font-bold">
                      {project.title[locale]}
                    </p>
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

export default ClosedProjectsSection;
