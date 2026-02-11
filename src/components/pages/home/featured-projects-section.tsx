"use client";
import { CarouselApi } from "@/components/ui/carousel";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const FeaturedProjectsSection = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [api, setApi] = useState<CarouselApi>();

  const projects = [
    {
      title: "فلل للبيع في مشروع تجريبي – حي النرجس",
      description:
        "همه العقارية تتميز في التسويق الحديث للعقارات، مستفيدة من قاعدة بيانات واسعة للعملاء وفريق خبراء لترويج المشاريع بش",
      img: "/featured-projects.svg",
      img_title: "همه العقارية تتميز في التسويق الحديث للعقارات، مستفيدة من ق",
    },
    {
      title: "فلل للبيع في مشروع تجريبي – حي النرجس",
      description:
        "همه العقارية تتميز في التسويق الحديث للعقارات، مستفيدة من قاعدة بيانات واسعة للعملاء وفريق خبراء لترويج المشاريع بش",
      img: "/featured-projects.svg",
      img_title: "همه العقارية تتميز في التسويق الحديث للعقارات، مستفيدة من ق",
    },
    {
      title: "فلل للبيع في مشروع تجريبي – حي النرجس",
      description:
        "همه العقارية تتميز في التسويق الحديث للعقارات، مستفيدة من قاعدة بيانات واسعة للعملاء وفريق خبراء لترويج المشاريع بش",
      img: "/featured-projects.svg",
      img_title: "همه العقارية تتميز في التسويق الحديث للعقارات، مستفيدة من ق",
    },
    {
      title: "فلل للبيع في مشروع تجريبي – حي النرجس",
      description:
        "همه العقارية تتميز في التسويق الحديث للعقارات، مستفيدة من قاعدة بيانات واسعة للعملاء وفريق خبراء لترويج المشاريع بش",
      img: "/featured-projects.svg",
      img_title: "همه العقارية تتميز في التسويق الحديث للعقارات، مستفيدة من ق",
    },
  ];
  console.log(api);
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
            className="gap-3 lg:gap-5 order-2 lg:order-1 w-full h-full"
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
                {api
                  ? `${api?.selectedScrollSnap() + 1}/${api?.scrollSnapList().length}`
                  : "0/0"}
              </p>
            </div>
            <CarouselContent className="w-full">
              {projects.map((project, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="grid lg:grid-cols-2 gap-3 lg:gap-5 xl:gap-10 w-full text-primary">
                    <div className="space-y-2">
                      <Image
                        src={project.img}
                        alt={project.img_title}
                        width={100}
                        height={100}
                        className="block w-full h-auto rounded-xl"
                      />
                      <p className="text-lg font-thin">{project.img_title}</p>
                    </div>
                    <div className="space-y-5">
                      <h3 className="text-3xl lg:text-4xl 2xl:text-5xl font-medium leading-13">
                        {project.title}
                      </h3>
                      <p className="text-lg font-thin">{project.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="items-center gap-3 hidden md:flex justify-end">
              <CarouselNext className="static text-black border-black size-15 translate-y-0" />
              <CarouselPrevious className="static text-black border-black size-15 translate-y-0" />
            </div>
          </Carousel>
          <Image
            src="/featured-projects-bg.svg"
            alt="Near To"
            width={100}
            height={100}
            className="block w-full h-auto order-1 lg:order-2 rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
