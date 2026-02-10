"use client";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Building2, HomeIcon } from "lucide-react";
import CountUp from "react-countup";

const statistics = [
  {
    title:
      "نعمل وفق رؤية استراتيجية واضحة تهدف إلى تقديم قيمة فعلية في سوق العقار السعودي،",
    description:
      "عبر بناء تجربة تسويقية متكاملة تُبرز جودة المنتج العقاري وتساعد العملاء على اتخاذ قرارات دقيقة وثابتة.",
    img: "/statistics-bg.svg",
    units_sold: "173K",
    projects_count: 300,
  },
];

const StatisticsSection = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <section className="min-h-[90svh] bg-background relative overflow-hidden">
      <img
        src="/section-bg-white.svg"
        alt="Section Background"
        className="absolute top-0 start-0 z-5 pointer-events-none"
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
              <img
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
              />
              <h2 className="section-title">{t("Statistics")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex">
              <CarouselNext className="static translate-y-0" />
              <CarouselPrevious className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[75svh]">
            {statistics.map((statistic, index) => (
              <CarouselItem
                key={index}
                className="basis-full text-white"
              >
                <p className="text-sm absolute top-5 start-5 z-5 ">
                  #{t("hemma_solgan")}
                </p>
                <img
                  src={statistic.img}
                  alt="Statistics"
                  className="w-full h-full object-cover rounded-4xl"
                />
                <div className="grid lg:grid-cols-2 gap-5 text-start absolute bottom-5 z-5 start-10 w-full">
                  <div className="space-y-3 order-2 lg:order-1">
                    <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl">
                      {statistic.title}
                    </h2>
                    <p className="text-white/80">{statistic.description}</p>
                  </div>
                  <div className="space-y-3 order-1 lg:order-2">
                    <div className="flex items-center gap-3 min-w-fit w-full">
                      <div className="rounded-full p-2 size-22 border border-white glass-bg min-w-fit flex items-center justify-center">
                        <Building2 className="size-7" />
                      </div>
                      <div className="space-y-1">
                        <CountUp
                          className="text-2xl lg:text-4xl font-bold font-urbanist"
                          end={statistic.projects_count}
                        />
                        <p className="text-sm">{t("Unique Projects")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 min-w-fit w-full">
                      <div className="rounded-full p-2 size-22 border border-white glass-bg min-w-fit flex items-center justify-center">
                        <HomeIcon className="size-7" />
                      </div>
                      <div className="space-y-1">
                        <CountUp
                          className="text-2xl lg:text-4xl font-bold font-urbanist"
                          end={Number(statistic.units_sold)}
                        />
                        <p className="text-sm">{t("sold units")}</p>
                      </div>
                    </div>
                  </div>
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

export default StatisticsSection;
