import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const GuaranteesFeatureCard = ({
  title,
  number,
}: {
  title: string;
  number: number;
}) => {
  const t = useTranslations();
  return (
    <Card className="border-0 rounded-xl">
      <CardContent className="space-y-3 text-center flex flex-col items-center justify-center">
        <div className="bg-main-700 text-white p-0.5 rounded-full size-13 flex items-center flex-col">
          <p className="font-bold text-lg font-inter">{number}</p>
          <p className="text-xs">{t("years", { count: number })}</p>
        </div>
        <h2 className="text-lg sm:text-xl text-main-700">{title}</h2>
      </CardContent>
    </Card>
  );
};

const GuaranteesSection = () => {
  const t = useTranslations();
  const features = [
    { title: t("Plugs and switches"), number: 25 },
    { title: t("Structural structure"), number: 25 },
    { title: t("Guarantee insulation"), number: 10 },
    { title: t("Intercom and cameras"), number: 10 },
    { title: t("Elevator warranty"), number: 25 },
    { title: t("Electric elevators"), number: 7 },
    { title: t("Paint"), number: 10 },
    { title: t("Sanitary ware"), number: 10 },
    { title: t("Green pipes"), number: 10 },
    { title: t("Smart lighting"), number: 3 },
  ];
  return (
    <section className="min-h-[90svh] bg-main-50 relative">
      <img
        src="/section-bg-caramel.svg"
        alt="Section Background"
        className="absolute top-0 start-0 z-5 pointer-events-none"
      />
      <div className="container py-[17svh] relative z-10  ">
        <div className="flex items-center gap-3 max-sm:flex-col mb-[7svh]">
          <img
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none"
          />
          <h2 className="section-title">{t("Guarantees")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-5">
          {features.map((feature, index) => (
            <GuaranteesFeatureCard
              key={index}
              title={feature.title}
              number={feature.number}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;
