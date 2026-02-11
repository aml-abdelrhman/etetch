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
    units_sold: "173",
    projects_count: 300,
  },
];

const StatisticsSection = () => {
  const t = useTranslations();
  const locale = useLocale();
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
              <h2 className="section-title">{t("Statistics")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex">
              <CarouselNext className="static text-black border-black size-15 translate-y-0" />
              <CarouselPrevious className="static text-black border-black size-15 translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[75svh]">
            {statistics.map((statistic, index) => (
              <CarouselItem
                key={index}
                className="basis-[95%] lg:basis-[97%] text-white bg-[url('/statistics-bg.svg')] bg-cover bg-center rounded-2xl p-5 2xl:p-7"
              >
                <p className="text-xs absolute top-5 start-5 z-5 ">
                  #{t("hemma_solgan")}
                </p>
                <div className="grid lg:grid-cols-12 gap-5 text-start place-content-end h-full">
                  <div className="space-y-3 order-2 lg:order-1 lg:col-span-8 place-self-end">
                    <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl leading-15">
                      {statistic.title}
                    </h2>
                    <p className="text-white/80">{statistic.description}</p>
                  </div>
                  <div className="space-y-7 xl:space-y-9 order-1 lg:order-2 lg:col-span-4 lg:place-self-end">
                    <div className="flex items-center gap-5 min-w-fit w-full">
                      <div className="rounded-full p-2 size-22 border border-white glass-bg min-w-fit flex items-center justify-center">
                        <Building2 className="size-7" />
                      </div>
                      <div className="space-y-1">
                        <CountUp
                          className="text-6xl font-bold font-urbanist"
                          end={statistic.projects_count}
                          suffix="+"
                          duration={3}
                          enableScrollSpy
                        />
                        <p className="text-sm text-white/80">
                          {t("Unique Projects")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 min-w-fit w-full">
                      <div className="rounded-full p-2 size-22 border border-white glass-bg min-w-fit flex items-center justify-center">
                        <HomeIcon className="size-7" />
                      </div>
                      <div className="space-y-1">
                        <CountUp
                          className="text-6xl font-bold font-urbanist"
                          end={Number(statistic.units_sold)}
                          suffix="K"
                          duration={3}
                          enableScrollSpy
                        />
                        <p className="text-sm text-white/80">
                          {t("sold units")}
                        </p>
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
