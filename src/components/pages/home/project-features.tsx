import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const ProjectFeatureCard = ({ title }: { title: string }) => {
  return (
    <Card className="border-0 rounded-xl">
      <CardContent className="space-y-3 text-center flex flex-col items-center justify-center">
        <CheckIcon className="bg-main-700 text-white p-1 rounded-full size-9" />
        <h2 className="text-lg sm:text-xl text-main-700">{title}</h2>
      </CardContent>
    </Card>
  );
};

const ProjectFeatures = () => {
  const t = useTranslations();
  const features = [
    t("Hydraulic doors"),
    t("Split air conditioning"),
    t("Outside setting"),
    t("Roof"),
    t("Independent counter"),
    t("Maid Room"),
    t("Laundry Room"),
    t("Master Bedroom"),
    t("Storehouse"),
    t("Elevators"),
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
          <h2 className="section-title">{t("Project characteristics")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-5">
          {features.map((feature, index) => (
            <ProjectFeatureCard key={index} title={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectFeatures;
