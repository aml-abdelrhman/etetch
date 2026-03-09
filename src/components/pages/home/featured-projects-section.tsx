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
import { useQuery } from "@tanstack/react-query";
import { projectsQueryOptions } from "@/queries";
import { cn } from "@/lib/utils";

const FeaturedProjectsSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "ar" | "en";
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0); // Track current slide
  const [count, setCount] = useState(0);
  const [displayedImage, setDisplayedImage] = useState(
    "/featured-projects-bg.svg",
  );
  const [isVisible, setIsVisible] = useState(true);

  const { data: projectsData, isError } = useQuery(
    projectsQueryOptions({ is_featured: true }),
  );

  if (isError) return <></>;

  const projects = projectsData?.data || [];

  useEffect(() => {
    if (!api || projects.length === 0) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const updateImage = () => {
      const index = api.selectedScrollSnap();
      const nextImage =
        projects[index]?.gallery[1] ||
        projects[index]?.gallery[0] ||
        "/featured-projects-bg.svg";

      setIsVisible(false);
      setTimeout(() => {
        setDisplayedImage(nextImage);
        setIsVisible(true);
      }, 300);

      setCurrent(index + 1);
    };

    api.on("select", updateImage);

    // Set initial image
    const initialIndex = api.selectedScrollSnap();
    const initialImage =
      projects[initialIndex]?.gallery[1] ||
      projects[initialIndex]?.gallery[0] ||
      "/featured-projects-bg.svg";
    setDisplayedImage(initialImage);

    return () => {
      api.off("select", updateImage);
    };
  }, [api, projects]);
  return (
    <section className="min-h-[80svh] bg-main-200 relative overflow-hidden">
      <div className="container py-[17svh] relative z-10 10 max-w-[1620px]">
        <Image
          src="/section-bg-dark-caramel.svg"
          alt="Section Background"
          className="absolute bottom-0 start-0 z-5 pointer-events-none"
          width={898}
          height={459}
        />
        <div className="grid lg:grid-cols-2 gap-7 lg:gap-5 relative z-10">
          <Carousel
            opts={{
              direction: locale === "ar" ? "rtl" : "ltr",
            }}
            setApi={setApi}
            className="order-2 lg:order-1 grid"
          >
            <div className="flex items-center justify-between mb-[7svh]">
              <div className="flex items-center gap-3 max-sm:flex-col">
                <Image
                  src="/section-logo.svg"
                  alt="Section Logo"
                  className="pointer-events-none"
                  width={60}
                  height={60}
                />
                <h2 className="section-title">{t("Featured projects")}</h2>
              </div>
              <p className="text-primary/50">
                {count > 0 ? `${current}/${count}` : "0/0"}
              </p>
            </div>
            <CarouselContent className="w-full">
              {projects?.map((project) => (
                <CarouselItem key={project.id} className="basis-full">
                  <div className="grid lg:grid-cols-2 gap-3 lg:gap-5 xl:gap-10 w-full text-primary">
                    <div className="space-y-2">
                      <Image
                        src={project?.gallery?.[0]}
                        alt={project.title[locale]}
                        width={500}
                        height={500}
                        className="block w-full h-[500px] object-cover object-top rounded-xl max-w-full"
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
            <div className="items-center gap-3 hidden md:flex justify-end mt-7">
              <CarouselPrevious className="static size-15 translate-y-0 rtl:rotate-180" />
              <CarouselNext className="static size-15 translate-y-0 rtl:rotate-180" />
            </div>
          </Carousel>
          <div className="relative w-full aspect-square order-1 lg:order-2">
            <Image
              src={displayedImage}
              alt="Project Image"
              fill
              className={cn(
                "object-cover rounded-3xl transition-opacity duration-300 ease-in-out max-w-full",
                isVisible ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
