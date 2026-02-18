"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { projectQueryOptions } from "@/queries";
import Image from "next/image";
import ImagePreview from "@/components/ui/image-preview";

const GallarySection = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { id } = useParams<{ id: string }>();
  const { data: project } = useQuery(projectQueryOptions(id));

  if (!project) return null;

  return (
    <section className="min-h-[90svh] bg-background relative overflow-hidden">
      <Image
        src="/section-bg-white.svg"
        alt="Section Background"
        className="absolute top-0 w-fit start-0 z-5 pointer-events-none"
        width={898}
        height={459}
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
              <Image
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
                width={60}
                height={60}
              />
              <h2 className="section-title">{t("Photo Gallery")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex" dir="ltr">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[65svh]">
            {project?.gallery?.map((src, index) => (
              <CarouselItem key={index} className="basis-[85%] lg:basis-[60%]">
                <div className="group relative h-full overflow-hidden rounded-4xl">
                  <ImagePreview
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    width={900}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
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

export default GallarySection;
