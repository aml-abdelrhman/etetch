"use client";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { closedProjectsQueryOptions } from "@/queries";
import Image from "next/image";
import { PlayIcon } from "@/icons";
import VideoViewer from "@/components/ui/video-viewer";

const ClosedProjectsSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "ar" | "en";

  const { data: projectsData, isError } = useQuery(
    closedProjectsQueryOptions(),
  );

  if (isError) return <></>;

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
              <Image
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
                width={60}
                height={60}
              />
              <h2 className="section-title">{t("We closed the door")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex" dir="ltr">
              <CarouselPrevious className="static text-black border-black size-15 translate-y-0" />
              <CarouselNext className="static text-black border-black size-15 translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[65svh]">
            {projects?.map((project) => (
              <CarouselItem
                key={project?.id}
                className="sm:basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
              >
                <VideoViewer
                  src={project?.youtube_link}
                  className="group relative h-full overflow-hidden rounded-4xl block"
                >
                  <Image
                    src={project?.img}
                    alt={project?.name || "Closed Project"}
                    className="h-full w-full object-cover"
                    width={250}
                    height={413}
                  />
                  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <PlayIcon className="size-10 sm:size-13" />
                  </div>
                </VideoViewer>
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

export default ClosedProjectsSection;
